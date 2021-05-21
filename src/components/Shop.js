import axios from 'axios'
import React, { useState, useEffect} from 'react'
import './css/Shop.css'
import ProductCard from './ProductCard'

export default function Shop() {
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
      Shop JS
      {console.log(mappedProducts)}
      {mappedProducts}
     
      
    </div>
  )
}
