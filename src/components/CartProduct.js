import './css/ProductCard.css'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {updateCart} from '../redux/cartReducer'

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
        <h2>{props.product.name}</h2>
        <p>{props.product.description}</p>
        <div id="to_cart">
          <p>${props.product.price}</p>
          <button onClick={() => props.updateCart(props.product.product_id, 1)}>Add To Cart</button>
          <button onClick={() => props.updateCart(props.product.product_id, -1)}>Remove From Cart</button>
          <button>Add To Wishlist</button>
        </div>
        
      </div>
    </section>
  )
}

function mapStateToProps(state){
  return state
}

const mapDispatchToProps = {
  updateCart: updateCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct)