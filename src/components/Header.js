import React, { useState, useEffect } from 'react'
import PopOutMenu from './PopOutMenu'
import { Link } from 'react-router-dom'
import './css/Header.css'
import axios from 'axios'


export default function Header(props) {
  const [navOverlay, setNavOverlay] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  function renderPopOut(){
    if(navOverlay){

      return <PopOutMenu/>
    }
  }

  
  function handleSearchTerm(e){
    setSearchTerm(e.target.value)
    
  }
  
  return (
    <section id='header-section'>
      <h2 id='website-name'>**Insert** Fandom</h2>
      <div id ='header'>
        {renderPopOut()}
        <div id = "hamburger-icon" className={`${navOverlay ? "open" : "closed"}`} onClick={() => setNavOverlay(!navOverlay)}></div>
        <span>
          <input onChange={(e) => handleSearchTerm(e)} placeholder="Search for a product.."/>
          <Link to ={{
            pathname: "/shop",
            state: {
              searchTerm: searchTerm
            }
          }} replace>
            <button onClick={() => setSearchTerm("")}>Search</button>
          </Link>
        </span>
        
        
        <Link to="/cart">
          <button id="cart">Cart</button>
        </Link>
        
        
      </div>
      
    </section>
  )
}
