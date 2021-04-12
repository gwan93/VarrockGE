
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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


function App() {

  useEffect(() => {

    Promise.all([
      axios.get("/widget"),
    ])

    .then(all => {
      console.log(all)
    })
    .catch(err => {
      console.log('@@@@@@@@@@@@@@@@', err)
    })


  }, []);


   
  return (
      <main>
        <BrowserRouter>
      <Switch>
          <Route path="/admin" exact>
          <Admin
        
        /> </Route>

          <Route path="/login"><Login/> </Route>

          <Route path="/widget" exact><Widget/></Route>

          <Route path="/widget/:id"><WidgetID/></Route>

          <Route path="/user/:id" exact><User/></Route>

          <Route path="/user/:id/collections/:id"><Collections/></Route>

          <Route path="/"><Home/></Route>

           </Switch>
           </BrowserRouter>
        </main>
        
    );
  
}

export default App;
