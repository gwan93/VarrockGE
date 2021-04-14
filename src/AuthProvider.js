import { createContext, useState } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
import history  from './History';

export default function AuthProvider(props) {
  // This is the wrapper
  // This wraps the App component
  // The wrapper provides all the state for the app
  const [auth, setAuth] = useState(false);

  // console.log('history is', history);
  const [id, setId] = useState();
  const [user, setUser] = useState({ email: "", name: "", });
  // console.log("initializing auth")

  // Perform login process for the user & save authID, etc
  const loginUser = function (email, password) {
    axios.post('/login', { email, password })
    .then(response => {
      console.log('User succesfully logged in. (from authprovider.js, loginuser function')
      console.log(response);
      setUser({ email, id, name: "Test User" })
      setAuth(true)
      history.push("/widgets");
    })
    .catch(err => {
      console.log('Your credentials were not valid. Please try again', err)
    })
  };


  const logoutUser = function (email, password) {
    setUser({ email: "", name: "" });
    setId(uuid()); //// ?? why here
    setAuth(false);
  };

  // authContext will expose these items
  const userData = { auth, user, loginUser, logoutUser };

  // We can use this component to wrap any content we want to share this context
  return (
    // Provider provides the userData object to props.children
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};

export const authContext = createContext();

