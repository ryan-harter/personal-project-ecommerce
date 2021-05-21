import  React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Authentication from './components/Authentication'
import AccountView from './components/AccountView'
import Wishlists from './components/Wishlists'
import FranchiseList from './components/FranchiseList'
import Shop from './components/Shop'
import Cart from './components/Cart'
import ItemPage from './components/ItemPage'


export default(
  <Switch>
    <Route exact path = "/" component={Landing}/>
    <Route path = "/authentication" component ={Authentication}/>
    <Route path = "/account" component ={AccountView}/>
    <Route path = "/wishlists" component={Wishlists}/>
    <Route path = "/franchise" component={FranchiseList}/>
    <Route path = "/shop" component={Shop}/>
    <Route path = "/cart" component={Cart}/>
    <Route path = "/itempage" component={ItemPage}/>
    
  </Switch>
)