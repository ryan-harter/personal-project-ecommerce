import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import cart from './cartReducer'
import user from './userReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const rootReducer = combineReducers({
  cart,
  user
})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))