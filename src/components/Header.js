import React, { useState, useEffect } from 'react'
import PopOutMenu from './PopOutMenu'
import { Link } from 'react-router-dom'
import './css/Header.css'


export default function Header() {
  const [navOverlay, setNavOverlay] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  function renderPopOut(){
    if(navOverlay){

      return <PopOutMenu/>
    }
  }

  function handleSearch(e){
    setSearchTerm(e.target.value)
  }

  
  return (
    <section id='header-section'>
      <h2 id='website-name'>**Insert** Fandom</h2>
      <div id ='header'>
        {renderPopOut()}
        <div id = "hamburger-icon" className={`${navOverlay ? "open" : "closed"}`} onClick={() => setNavOverlay(!navOverlay)}></div>
        {/* <img id="hamburger-icon" src="https://paragondigital.com/wp-content/uploads/Menu-Icon2.jpg" alt="Hamburger Menu" onClick={() => setNavOverlay(!navOverlay)} /> */}
        <input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for..."/>
        <Link to="/cart">
          <button id="cart">Cart</button>
        </Link>
        
        
      </div>
      
    </section>
  )
}
