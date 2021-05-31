import React, { useState, useEffect, useRef } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import { updateCart } from '../redux/cartReducer'
import './css/Cart.css'
import CartProduct from './CartProduct'
import axios from 'axios'
import { toast } from 'react-toastify'

 

toast.configure()

function Cart(props) {
  const [cartProducts, setCartProducts] = useState([])
  const cartRef = useRef()

  function setCartRef(data){
    setCartProducts(data)
    
  }
  //not rerendering because array is still array, even if it has changed?

  function getCartProductIds(){
    
    let productIds = [];

    for (const key in props.cart.cart){
      // console.log({cart: props.cart.cart[key].qty})
      productIds.push(key)
    }
    axios.get(`/api/products?product_ids=${productIds}`).then(res =>{
      let products = res.data
      
      setCartProducts(() => [...products])
      
      console.log(products)
    })
  }

  
  
  useEffect(() => {
    getCartProductIds()
    console.log(cartProducts)
  }, [props.cart.cart])

  
  async function handleToken(token, addresses){
    console.log({ token, addresses })
     const response = await axios.post('/checkout', {
       token,
       cartProducts
      })
      console.log(response)
      const { status } = response.data
      if(status === 'success'){
        toast('Success! Check Email for detail', { type: 'success'})
      }else{
        toast('Something went wrong', {type: "error"})
      }
  }

 const totalPrice = cartProducts.reduce((total, object) => parseFloat(object.price) + total,0)

  

  let mappedCart = cartProducts.map(e =>{
    console.log(e)
    
    const productQty = props.cart.cart[e.product_id].qty
    
    
    return <CartProduct qty={productQty ? productQty : 0} product ={e} key={e.product_id}/>
  })
  

  return (
    <div id="cart-view">
      <h2>Your Cart</h2>
      

      {mappedCart}
      <h3>Total ${totalPrice}</h3>
      
      
      <StripeCheckout
        stripeKey="pk_test_51IrSZLIL4QzNSviPBE8TRItBN3vTqRS8Vx1zOM6KwXVNxaAHNiuObOxQSS0BkPvwB8kW6cBJo3uJvmHaJbe3CjzR00IMnHFJ3Q"
        token={handleToken}
        billingAddress
        shippingAddress
        amount = {totalPrice * 100}
        name= {` and others`}
      />
    </div>
  )
}
function mapStateToProps(state){
  return{
    cart: state.cart
  }
}

const mapDispatchToProps = {
  updateCart: updateCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)