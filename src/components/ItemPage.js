import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateCart } from '../redux/cartReducer'
import './css/ItemPage.css'


function ItemPage(props) {
  
  
  const {name, description, price, url} = props.location.state.product
  

  return (
   
    <section id="item_page">
      <img id="item_image" src={props.location.state.product.url} alt="item-image"/>
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>${price}</p>
        <button onClick={() => props.updateCart(props.location.state.product, 1)}>Add To Cart</button>
        <button onClick={() => props.updateCart(props.location.state.product, -1)}>Remove From Cart</button>
        <button>Add to Wishlist</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(ItemPage)