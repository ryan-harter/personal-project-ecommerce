import React, { useState, useEffect, useRef } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import { resetCart, updateCart } from '../redux/cartReducer'
import './css/Cart.css'
import CartProduct from './CartProduct'
import axios from 'axios'
import {toast} from 'react-toastify'

import "react-toastify/dist/ReactToastify.css"
import AccountView from './AccountView'



 

toast.configure()

function Cart(props) {
  const [cartProducts, setCartProducts] = useState([])
  

  function getCartProductIds(){
    
    let productIds = [];

    for (const key in props.cart.cart){
      
      productIds.push(key)
    }
    axios.get(`/api/products?product_ids=${productIds}`).then(res =>{
      let products = res.data
      
      setCartProducts([...products])
      
      // console.log(products)
    })
  }

  
  
  useEffect(() => {
    getCartProductIds()
    
  }, [props.cart.cart])

  
  async function handleToken(token, addresses){
    console.log({ token, addresses })
     const response = await axios.post('/checkout', {
       token,
       cartProducts,
       finalTotal
      })
      console.log(response)
      const { status } = response.data
      if(status === 'success'){
        let destinationEmail = token.email
        let name = "Thank you for your purchase!"
        let message = `Hi ${addresses.billing_name},
         Thank you for your purchase of ${finalTotal.toFixed(2)}. You will receive shipping updates as soon as we have them!`
        axios.post('/send', {destinationEmail, name, message})
        toast('Success! Check your email for confirmation', { type: 'success'})
        props.resetCart()
      }else{
        toast('Something went wrong, please try again later', {type: "error"})
      }

  }



  let runningTotal = [0]
  

  let mappedCart = cartProducts.map(e =>{
    // console.log(e)
    if(props.cart.cart[e.product_id]){
      const total = e.price * props.cart.cart[e.product_id].qty
      runningTotal.push(total)
      return  <CartProduct qty={props.cart.cart[e.product_id].qty} product={e} key={e.product_id}/>
    }
  })
  
  const finalTotal = runningTotal.reduce((total, object) => total + object)
  

  return (
    <div id="cart-view">
      {mappedCart.length === 0 ? <h2>Your Cart is Empty</h2>: <h2>Your Cart</h2>}
      <div id="cart-products">
        {mappedCart}
      </div>
      
      <h3>Total ${finalTotal.toFixed(2)}</h3>
      
      
      <StripeCheckout
        stripeKey="pk_test_51IrSZLIL4QzNSviPBE8TRItBN3vTqRS8Vx1zOM6KwXVNxaAHNiuObOxQSS0BkPvwB8kW6cBJo3uJvmHaJbe3CjzR00IMnHFJ3Q"
        token={handleToken}
        billingAddress
        shippingAddress
        amount = {finalTotal * 100}
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
  updateCart: updateCart,
  resetCart: resetCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)