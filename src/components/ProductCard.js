import './css/ProductCard.css'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {updateCart} from '../redux/cartReducer'
import { addToWishlist } from '../redux/userReducer'
import { toast } from 'react-toastify'

import "react-toastify/dist/ReactToastify.css"

function ProductCard(props) {
  useEffect(() =>{
    
  }, [props.cart])
  return (
    
    <section id="product_card">
     
      <div id="product_image">
        <Link to ={{
          pathname: "/itempage",
          state: {
            product: props.product
          }
        }}  >
          <img id="image" src={`${props.product.url}`} alt="item image"/>
        </Link>
        
      </div>
      <div id="product_info">
        <h4>{props.product.name}</h4>
        <p>{props.product.description}</p>
        <p>${props.product.price}</p>
        <div id="to_cart">
          
          <button onClick={() => {props.updateCart(props.product.product_id, 1)}}>+ Cart</button>
          {/* {props.cart.hasOwnProperty(props.product.product_id) ? (
            <button onClick={() => {props.updateCart(props.product.product_id, -1); toast.success(`${props.product.name} removed from cart`)}}>- Cart</button>
          ): <p>not in cart</p>} */}
          
          
          <button onClick={() => {props.addToWishlist(props.product.product_id, 1)}}>+ Wishlist</button>
        </div>
        
      </div>
    </section>
  )
}

function mapStateToProps(state){
  return state
}

const mapDispatchToProps = {
  updateCart: updateCart,
  addToWishlist: addToWishlist
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)