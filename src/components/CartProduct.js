import './css/ProductCard.css'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {updateCart} from '../redux/cartReducer'
import { addToWishlist } from '../redux/userReducer'

function CartProduct(props) {
  

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
        <p>${parseFloat(props.product.price) * props.qty}</p>
        <p>Qty: {props.qty}</p>
        <div id="to_cart">
          <button onClick={() => props.updateCart(props.product.product_id, 1)}>+Cart</button>
          <button onClick={() => props.updateCart(props.product.product_id, -1)}>-Cart</button>
          <button onClick={() => props.addToWishlist(props.product.product_id, 1)}>+Wishlist</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct)