
import { Router, Route, Switch, Link } from 'react-router-dom';
import React from "react";
import './App.css';

import Admin from './screens/admin';
import Login from './screens/login';
import Home from './screens/home';
import Widgets from './screens/widgets';
import User from './screens/user';
import history from './History';
import Navigation from './screens/navigation'

export default function App() {

  return (
    <main>
      <Router history = {history}>
      <Navigation />

        <Switch>
          <Route path="/admin" exact><Admin/></Route>
          <Route path="/login"><Login/> </Route>
          <Route path="/widgets" component={Widgets}></Route>
          <Route path="/user/:id/collections" component={User}></Route>
          <Route path="/"><Home/></Route>
        </Switch>
      </Router>
    </main>
  );
}