import React, { useEffect }from "react";
import { useHistory, Link } from "react-router-dom";

export default function Home({setNavbar}) {
  let history = useHistory();
  const redirectLogin = () => {
    history.push('/login')
  }
  const redirectWidget = () => {
    history.push('/widgets')
  }
  
  //hides nav bar
  useEffect(() => {
    setNavbar(true);
  });
  return (
    <div>
      <h3>Home Page</h3>
      <img src="https://i.kym-cdn.com/photos/images/newsfeed/002/054/465/b31.jpg" alt="elbaby"/>
      <div> 
      <Link to="/login" className="btn btn-primary">Login</Link>
      <Link to="/widgets" className="btn btn-primary">Marketplace</Link>
        <button onClick={redirectLogin}>Login</button>
        <button onClick={redirectWidget}>Marketplace</button>
      </div>
    </div>
 
  );
}
