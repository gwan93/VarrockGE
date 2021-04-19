import React from "react";
import { useState, useContext } from 'react';
import { authContext } from '../AuthProvider';
import { TextField, Button, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
   height: "100%"
  },
}));

export default function Login({setNavbar}) {
  const classes = useStyles();
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
    <div className={classes.container}>
      <form onSubmit={onSubmit}
      className={classes.container}
      >           
            <Grid
            direction={'column'}
            alignItems={'center'}
            spacing={2}
            container 
            justify={"center"}
            // className={classes.container}
            >
              <h3>Login</h3>
            <Grid
            item
            >
            <TextField 
            id="emailInput"
            variant={"filled"}
            label={"Email Address"}
            value={email}
            onChange={onEmailChange}
            placeholder={"email"}
            ></TextField>
            </Grid>
            {/* <label htmlFor="emailInput">Email address</label>
            <input
              type="email"
              name="login"
              className="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={onEmailChange}
            ></input> */}
          <Grid
          item
          >
          <TextField 
            id="passwordInput"
            variant={"filled"}
            label={"Password"}
            value={password}
            onChange={onPasswordChange}
            placeholder={"password"}
            ></TextField>
          </Grid>
            {/* <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              value={password}
              onChange={onPasswordChange}
            ></input> */}
        <Grid
        item
        >
          <Button
          variant={"contained"}
          > 
        Submit 
          </Button>
          </Grid>
        {/* <button type="submit" className="submit">
          Submit
        </button> */}
            </Grid>
      </form>
    </div>
  );
}
