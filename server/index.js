require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const cors = require("cors")
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const authCtrl = require('./controllers/authCtrl')
const productCtrl = require('./controllers/productCtrl')
const wishlistCtrl = require('./controllers/wishlistCtrl')
const {v4: uuidv4} = require("uuid")
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(cors())

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365},
    secret: SESSION_SECRET
  })
)


massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(dbInstance => {
  console.log('database connected')
  app.set('db', dbInstance)
  app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`))
})

// Auth Endpoints
app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.delete('/api/auth/logout', authCtrl.logout)
app.post('/api/auth/delete/', authCtrl.delete)


// Product Endpoints
app.get('/api/products', productCtrl.getAllProducts)
app.get('/api/product/:id', productCtrl.getProduct)


//wishlist Endpoints?
app.post('/api/wishlist', wishlistCtrl.addToWishlist) 
app.delete('/api/wishlist/:id', wishlistCtrl.deleteFromWishlist) 
app.get('/api/wishlist', wishlistCtrl.getWishlist)

// stripe endpoints
app.post("/checkout", async (req,res)=>{
  //console.log("request", req.body)

  let error;
  let status;

  try{
    const { cartProducts, token } = req.body
    const customer = await
    stripe.customers.create({
      email: token.email,
      source: token.id
    }); 

    const idempotency_key = uuidv4();
    const charge = await stripe.charges.create({
      amount: cartProducts.reduce((total, object) => Number(object.price) + total,0) * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the ${cartProducts[0].name}`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city, 
          country: token.card.address_country,
          postal_code: token.card.address_zip 
        }
      }
    })
    //console.log("charge:", {charge})
    status = "success"
  }catch (err) {
    console.error("error:", err)
    status = "failure"
  }
  res.json({error, status})
})