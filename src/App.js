import { Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Admin from './screens/admin';
import Login from './screens/login';
import Home from './screens/home';
import Widgets from './screens/widgets';
import User from './screens/user';
import history from './History';
import Navigation from './screens/navigation';
import Cart from './screens/cart';
import Collections from './screens/collections';
import Collection from './screens/collection';


export default function App() {

  return (

      <main>
      <Router history = {history}>
      <Switch>
          <Route path="/login"><Login/> </Route>
          <Route exact path="/"component={Home}></Route>
        <div>
      <Navigation />
          <Route path="/admin" component={Admin}></Route>
          <Route path="/widgets" component={Widgets}></Route>
          <Route exact path="/user/:id" component={User}></Route>
          <Route exact path="/user/:id/collections" component={Collections}></Route>
          <Route exact path="/user/:id/collections/new" component={Collection}></Route>
          <Route exact path="/user/:id/collections/:collectionID" component={Collection}></Route>
          <Route path="/cart" component={Cart}></Route>
          </div>
          </Switch>
      </Router>
    </main>
  )
}