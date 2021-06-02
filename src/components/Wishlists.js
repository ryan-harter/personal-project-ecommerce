import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../redux/userReducer';
import WishlistProductCard from './WishlistProductCard'
import './css/Wishlists.css'



function Wishlists(props) {
  const [wishlistProducts, setWishlistProducts] = useState([])


  function getWishlistProductIds(){
    
    let productIds = [];

    axios.get('/api/wishlist').then(res =>{
      setWishlistProducts(res.data)
    })

    // console.log(wishlistProducts)

   }

   useEffect(() =>{
     getWishlistProductIds()
   }, [wishlistProducts]) // mem leak?

   const mappedWishlist = wishlistProducts.map((e,i) => {

     return <WishlistProductCard product = {e} key = {i}/>
   })

  return (
    <div id="wishlist_page">
      <h2>Your Wishlist</h2>
      <div id="wishlist_products">
        {mappedWishlist}
      </div>
      
       
    </div>
  )
}

function mapStateToProps(state){
  return{
    wishlist: state.wishlist
  }
}

const mapDispatchToProps = {
  addToWishlist: addToWishlist,
  removeFromWishlist: removeFromWishlist
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlists)