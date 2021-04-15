
import { Router, Route, Switch } from 'react-router-dom';
import React, { useState }  from "react";
import './App.css';

import Admin from './screens/admin';
import Login from './screens/login';
import Home from './screens/home';
import Widgets from './screens/widgets';
import User from './screens/user';
import history from './History';
import Navigation from './screens/navigation';
import Cart from './screens/cart';




export default function App(props) {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  return (
    <main>
      
      <Router history = {history}>
      {isNavbarHidden ? null : <Navigation/>}
        <Switch>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/widgets" component={Widgets}></Route>
          <Route path="/user/:id/collections" component={User}><Navigation /></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/login" render={() => <Login  setNavbar={setIsNavbarHidden}  />}/>
          <Route exact path="/" render={() => <Home setNavbar={setIsNavbarHidden}  />}/>
        </Switch>
      </Router>
    </main>
  )
}