import React, {useContext} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Widget from './widget';
import { authContext } from '../AuthProvider';

export default function Widgets(){
  const { state } = useContext(authContext)

  console.log('state.widgets are', state.widgets);
  console.log(state.widgets[0])

  const widgetList = state.widgets.map((widget) => {
    console.log(widget['id'])
    return (
      <Link to={`/widgets/${widget['id']}`}>Widget {widget['id']} </Link>
    )
  })
  return(
    <div>
      <h2>These are all of our Widgets!</h2>

      <nav>
        {widgetList}
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