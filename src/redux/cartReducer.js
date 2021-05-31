const initialState = {
  cart: { }
}

const UPDATE_CART = "UPDATE_CART"

export function updateCart(product_id, qty){
  return {
    type: UPDATE_CART,
    payload: {product_id, qty}
  }
}

function handleModifyCart(state, payload){
  let {qty = 1, product_id} = payload
  let newState = {...state}
  if (state.cart[product_id]){
    
    newState.cart[product_id].qty += qty
    

  } else{
    newState.cart[product_id] = {qty}
  }
  if (newState.cart[product_id].qty <= 0){
      delete newState.cart[product_id]
  }
  return newState
}



export default function cartReducer(state = initialState, action){
  const {type, payload} = action;

  switch(type){
    case UPDATE_CART:
      console.log(payload)
      return handleModifyCart(state, payload)
    default:
      return state
  }
}