import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Widget from './widget';

export default function Widgets(){
  return(
    <div>
      <h2>These are all of our Widgets</h2>

      <nav>
        <Link to="/widgets/1">Product #1</Link>
        <Link to="/widgets/2">Product #2</Link>
        <Link to="/widgets/3">Product #3</Link>
        <Link to="/widgets/4">Product #4</Link>
      </nav>

      <Switch>
        <Route path="/widgets/:widgetID" component={Widget}/>
        <Route path="/widgets">
          <h2>Please select a widget to view</h2>
        </Route>
      </Switch>
    </div>
  )

}