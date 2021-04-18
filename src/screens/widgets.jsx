import React, { useContext } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Widget from "./widget";
import { authContext } from "../AuthProvider";

export default function Widgets() {
  const { state } = useContext(authContext);

  const renderWidgetList = () => {
    const widgetList = state.widgets.map((widget) => {
      if (widget.for_sale_by_owner) {
        return (
          <li>
            <Link key={`${widget['id']}`} to={`/widgets/${widget['id']}`}>
              {widget.id}. {widget['name']}
            </Link>
          </li>
        );
      }
    });
    return widgetList;
  };

  return (
    <div>
      <h2>These are all of our Widgets!</h2>

      <nav>{renderWidgetList()}</nav>

      <Switch>
        <Route path="/widgets/:widgetID" component={Widget} />
        <Route path="/widgets">
          <h2>Please select a widget to view</h2>
        </Route>
      </Switch>
    </div>
  );
}
