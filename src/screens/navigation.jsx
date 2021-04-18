import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../AuthProvider";

export default function Navigation() {
  const { state } = useContext(authContext);
  const userID = state.user.id;

  console.log('nav state', state);

  return (
    <nav>
      <Link to="/">Home </Link>
      {state.user.isadmin && <Link to="/admin">Admin </Link>}
      {!state.user.id && <Link to="/login">Login </Link>}
      <Link to="/widgets">Widgets </Link>
      {/* <Link to={`/user/${userID}/collections`}>Collection </Link> */}
      {state.user.id && <Link to={`/user/${userID}`}>User: {state.user.email} </Link>}
      {state.user.id && <Link to="/Cart">Cart ({state.itemsInCart.length}) </Link>}
      {state.user.id && <Link to="/login">Logout </Link>}
    </nav>
  );
}
