
import { Router, Route, Switch } from 'react-router-dom';
import { useEffect } from "react";
import './App.css';
import axios from "axios";

import Admin from './screens/admin';
import Login from './screens/login';
import Home from './screens/home';
import Widget from './screens/widget';
import WidgetID from './screens/widget-id';
import User from './screens/user';
import Collections from './screens/collections';
import history from './History';


function App() {

  // useEffect(() => {

  //   Promise.all([
  //     axios.get('/user/:id'),
  //     axios.get('/user/:id/collections/:id'),
  //     axios.get('/widget'),
  //     axios.get('/widget/:id')
  //   ])

  //   .then(all => {
  //     console.log('AHHHHHHHIMLOGGING', all)
  //   })
  //   .catch(err => {
  //     console.log('@@@@@@@@@@@@@@@@', err)
  //   })


  // }, []);


   
  return (
      <main>
        <Router history = {history}>
      <Switch>
          <Route path="/admin" exact>
          <Admin
        
        /> </Route>

          <Route path="/login"><Login/> </Route>

          <Route path="/widget" exact><Widget/></Route>

          <Route path="/widget/:id"><WidgetID/></Route>

          <Route path="/user/:id/collections" exact><User/></Route>

          <Route path="/user/:id/collections/:id"><Collections/></Route>

          <Route path="/"><Home/></Route>

           </Switch>
           </Router>
        </main>
        
    );
  
}

export default App;
