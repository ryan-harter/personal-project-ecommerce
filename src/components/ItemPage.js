import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateCart } from '../redux/cartReducer'
import { addToWishlist } from '../redux/userReducer'
import './css/ItemPage.css'


function ItemPage(props) {
  
  
  const {name, description, price, url} = props.location.state.product
  

  return (
   
    <section id="item_page">
      <img id="item_image" src={props.location.state.product.url} alt="item-image"/>
      <div id="item_info">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>${price}</p>
        <button onClick={() => props.updateCart(props.location.state.product.product_id, 1)}>Add To Cart</button>
        {/* <button onClick={() => props.updateCart(props.location.state.product.product_id, -1)}>Remove From Cart</button> */}
        <button onClick={() => props.addToWishlist(props.location.state.product.product_id, 1)}>Add to Wishlist</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(ItemPage)