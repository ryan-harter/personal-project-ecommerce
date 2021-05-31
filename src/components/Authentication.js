import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../redux/userReducer'
import './css/Authentication.css'

function Authentication(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  function handleChange(prop, val){
    if(prop === "email"){
      setEmail(val)
    }else if (prop === "password"){
      setPassword(val)
    }
    
  }

  function login(){
    axios.post('/api/auth/login', {email, password})
    .then(res => {
      
      props.history.push('/shop') 
      props.updateUser(res.data)
      
      
    })
  }

  function register(){
    axios.post('/api/auth/register', {email, password})
    .then(res => {
      props.history.push('/shop')
      props.updateUser(res.data)
    })
  }

  return (
    <div id = "authentication">
      <h2>Sign In</h2>
      <section id = "authentication-box">
        
        <input placeholder="Email" value={email} onChange={e => handleChange('email', e.target.value)}/>
        <input placeholder="Password" value={password} onChange={e => handleChange('password', e.target.value)}/>
        <button onClick={login}>Login</button>
        <p>-- or --</p>
        <button onClick={register}>Create Account</button>
      </section>
      
    </div>
  )
}

function mapStateToProps(state){
  return state
}

let mapDispatchToProps = {
  updateUser:updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)