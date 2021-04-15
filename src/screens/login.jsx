import React from "react";
import { useState, useContext } from 'react';
import { authContext } from '../AuthProvider';

export default function Login({setNavbar}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(authContext); // the login method

  // updating input fields
  const onEmailChange = function (event) {
    setEmail(event.target.value);
  };

  // updating input fields
  const onPasswordChange = function (event) {
    setPassword(event.target.value);
  };

  // if email exists, login with the provided email and password
  const onSubmit = function (event) {
    event.preventDefault();
    if (email && password) {
      loginUser(email, password);
    }
    
  };

  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        <h3>Login</h3>
          <p>
            <label htmlFor="emailInput">Email address</label>
            <input
              type="email"
              name="login"
              className="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={onEmailChange}
            ></input>
          </p>
          <p>
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              value={password}
              onChange={onPasswordChange}
            ></input>
          </p>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
