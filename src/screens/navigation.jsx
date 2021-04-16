import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../AuthProvider";

export default function Navigation() {
  const { state } = useContext(authContext);
  const userID = state.user.id;

  return (
    <nav>
      <Link to="/">Home </Link>
      <Link to="/admin">Admin </Link>
      <Link to="/login">Login </Link>
      <Link to="/widgets">Widgets </Link>
      <Link to={`/user/${userID}`}>Collection </Link>
      <Link to={`/user/${userID}/collections`}>User </Link>
      <Link to="/Cart">Cart </Link>
      <Link to="/login">Logout </Link>
    </nav>
  );
}
