require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const cors = require("cors")
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const authCtrl = require('./controllers/authCtrl')
const productCtrl = require('./controllers/productCtrl')

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

// stripe endpoints
app.post("/payment", cors(), async (req,res)=>{
  let {amount, id} = req.body
  try{
    const payment = await strip.paymentIntents.create({
      amount,
      currency: "USD",
      description: "",
      payment_method: id,
      confirm: true
    })
    console.log("Payment", payment)
    res.json({
      message: "Payment successful",
      success: true
    })
  }catch (error){
    console.log("error", error)
    res.json({
      message: "Payment Failed",
      success: false
    })
  }
})