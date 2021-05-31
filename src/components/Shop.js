import axios from 'axios'
import React, { useState, useEffect} from 'react'
import './css/Shop.css'
import ProductCard from './ProductCard'

export default function Shop(props) {
  const [shopProducts, setShopProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products').then(res => {
      
      setShopProducts(res.data)
    })
  }, [])
  
  const mappedProducts = shopProducts.map(e => {
    return <ProductCard product={e}  key={e.product_id}/>
  })


  return (
    <div id='shop'>
      
      <h2>Shop</h2>
      <div id='shop_products'>
        {mappedProducts}
      </div>
       
      
    </div>
  )
}
