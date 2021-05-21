import React, { useState, useEffect } from 'react'
import PopOutMenu from './PopOutMenu'
import { Link } from 'react-router-dom'
import './css/Header.css'


export default function Header() {
  const [navOverlay, setNavOverlay] = useState(false)

  function renderPopOut(){
    if(navOverlay){
      return <PopOutMenu/>
    }
  }


  return (
    <section id='header-section'>
      <h2 id='website-name'>**Insert** Fandom</h2>
      <div id ='header'>
        {renderPopOut()}
        <img id="hamburger-icon" src="https://paragondigital.com/wp-content/uploads/Menu-Icon2.jpg" alt="Hamburger Menu" onClick={() => setNavOverlay(!navOverlay)} />
        <input placeholder="Search for..."/>
        <Link to="/cart">
          <button id="cart">Cart</button>
        </Link>
        
        
      </div>
      
    </section>
  )
}
