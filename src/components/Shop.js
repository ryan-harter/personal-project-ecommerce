import axios from 'axios'
import React, { useState, useEffect} from 'react'
import './css/Shop.css'
import ProductCard from './ProductCard'

export default function Shop(props) {
  const [shopProducts, setShopProducts] = useState([])
  const [search, setSearch] = useState("")

  async function getShopProducts(){
    if(props.location.state){
      console.log(props.location.state.searchTerm)
      setSearch(props.location.state.searchTerm)
      
      
      let response = await axios.get(`api/products?search_term=${props.location.state.searchTerm}`)
        console.log(response.data)
        let products = response.data
        setShopProducts([...products])
      
      
    }else{
      axios.get('/api/products').then(res =>{
        setShopProducts(res.data)
      })
    }
  }

  useEffect(() => {
    getShopProducts()
    // axios.get('/api/products').then(res => {
      
    //   setShopProducts(res.data)
    // })
  }, [props.location.state])

  
  
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
