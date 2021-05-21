import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { logout } from '../redux/userReducer'
import {Link} from 'react-router-dom'
import './css/AccountView.css'

function AccountView(props) {
  const [password, setPassword] = useState("")
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)


  function deleteAccount(){
    axios.post('/api/auth/delete', {password})
    .then( res => {
      props.history.push('/landing')
      props.logout()
    })
  }


  function handleDeletingChange(){
    setDeleting(!deleting)
  }


  function handlePasswordChange(value){
    setPassword(value)
    
  }

  function handleEditing(){
    setEditing(!editing)
  }

  return (
    <div id="account-view">
      <Link to ="/wishlists">Your Wishlists</Link>
      <h3>Email: {props.user.email}</h3>
      {editing ?(
        <div id="editing">
          <h3>Are you sure you wish to change your password?</h3>
          <input placeholder="new password"/>
          <button onClick={handleEditing}>Cancel</button>
          <p> -- or --</p>
          <button>Confirm Change</button>
        </div>
      ):
      <button onClick={handleEditing}>Change Password</button>
      }
      


      {deleting ? (
        <div id="deleting">
          <h3>Are you sure you wish to delete your account?</h3>
          <input placeholder="confirm your password" value={password} onChange={e => handlePasswordChange(e.target.value)}/>
          <button onClick={handleDeletingChange}>Cancel</button>
          <p>-- or --</p>
          <button onClick={deleteAccount}>Confirm Delete</button>
        </div>
      )
      :
      <button onClick={handleDeletingChange}>Delete My Account</button>
    }
      

    </div>
  )
}

function mapStateToProps(state) {
  return state
}

let mapDispatchToProps = {
  logout: logout
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountView)