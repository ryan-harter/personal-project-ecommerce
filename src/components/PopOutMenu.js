import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { logout } from '../redux/userReducer'
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'
import './css/PopOutMenu.css'

function PopOutMenu(props) {
  
  let history = useHistory()


  function logout(){
    axios.delete('/api/auth/logout')
    .then(_ => props.logout())
    history.push('/shop')
    
  }

  return (
    <section id="pop-out-menu">
      {/* <Link to = "/franchise" className="links">Franchise</Link> */}
      <Link to = "/shop" className="links">Shop</Link>
      {/* <Link to ="/shop" className="links">Collectibles</Link>
      <Link to ="/shop" className="links">Artwork</Link> */}
      
      
      { props.user.email ?(
        <>
        <Link to ="/account" className="links">My Account</Link>
        <Link to ="/" onClick={logout} className="links">Sign Out</Link>
        </>
        
      ):(
        <Link to = '/authentication' className="links" >Sign In</Link>
      )}
      
    </section>
  )
}

function mapStateToProps(state){
  return state
}

let mapDispatchToProps = {
  logout: logout
}
export default connect(mapStateToProps, mapDispatchToProps)(PopOutMenu)