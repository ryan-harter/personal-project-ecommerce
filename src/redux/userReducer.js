const initialState = {
  email: '',
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

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
    case LOGOUT:
      return {...state, email: ''};
    default: 
      return state;
  }
}