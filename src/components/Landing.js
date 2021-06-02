import React from 'react'
import './css/Landing.css'
import {Link} from 'react-router-dom'

export default function Landing() {
  return (
    <div id='landing_page'>
      
      <div id='landing_card'>
        
      <div id="text">
          <h1>Welcome to </h1>
          <h1>**Insert** Fandom</h1>
          
        </div>
        <section className="images">
            <img className="bottom" src="https://images-na.ssl-images-amazon.com/images/I/71ccPZ5%2BJzL._AC_SL1039_.jpg"/>
            <img className="top" src="https://images-na.ssl-images-amazon.com/images/I/51-jt7ZQI%2BL._AC_.jpg"/>
            
          </section>
        
        <Link to="/shop">
          <button id="enter_store">Enter Store</button>
        </Link>
        
      </div>

      

    </div>
  )
}
