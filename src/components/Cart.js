import React from 'react'
import { loadStripe } from '@stripe/react-stripe-js'
import { connect } from 'react-redux'
import { updateCart } from '../redux/cartReducer'
import ProductCard from './ProductCard'
import './css/Cart.css'
import CartProduct from './CartProduct'


 
// const stripePromise = loadStripe('pk_test_51IrSZLIL4QzNSviPBE8TRItBN3vTqRS8Vx1zOM6KwXVNxaAHNiuObOxQSS0BkPvwB8kW6cBJo3uJvmHaJbe3CjzR00IMnHFJ3Q')

function Cart(props) {

  

  return (
    <div>
      <h2>Your Cart</h2>
      <button id="checkout_button">Checkout</button>
      <CartProduct/>

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