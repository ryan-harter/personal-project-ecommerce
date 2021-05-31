import axios from "axios"


const initialState = {
  email: '',
  wishlist: {}
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
const REMOVE_FROM_WISHLIST= 'REMOVE_FROM_WISHLIST'




export function addToWishlist(product_id, qty){
  console.log(product_id)
  return {
    type: ADD_TO_WISHLIST,
    payload: axios.post('/api/wishlist', {product_id})
  }
} 

function handleModifyWishlist(state, payload){
  
  let {product_id} = payload.data[1]
  console.log(product_id)
  let newState = {...state}
  
  
  return newState
}

export function removeFromWishlist(product_id){
  
  return {
    type: REMOVE_FROM_WISHLIST,
    payload: axios.delete(`/api/wishlist/${product_id}`)
  }
}  

export function updateUser(userObj){

  return{ 
    type: UPDATE_USER,
    payload: userObj
  }
}

export function logout(){
  return{
    type: LOGOUT,
  }
}

export default function userReducer(state = initialState, action){
  const {type, payload} = action;

  switch(type){
    case UPDATE_USER:
      return {...state, email: payload.email};
    case ADD_TO_WISHLIST + "_FULFILLED":
      console.log(payload)
      return handleModifyWishlist(state, payload)
    case REMOVE_FROM_WISHLIST:
      return {...state, wishlist: payload}
    case LOGOUT:
      return {...state, email: ''};
    default: 
      return state;
  }
}