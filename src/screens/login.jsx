import React from "react";
import { useState, useContext } from 'react';
import { authContext } from '../AuthProvider';
import { TextField, Button, makeStyles, Grid, Typography, Card, CardActions, CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
   height: "100%",
   cardGrid: {
    padding: '20px 0'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    // paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    flexGrow: 10
  },

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
    <div className={classes.container} maxWidth="xs">
      <Grid
      container
      xs={'2'}
      direction={'column'}
      spacing={0, 0, 3, 0}
      justify={'space-around'}
      // alignContent={'flex-end'}
      alignItems={'center'}
      // spacing={0}
      // justify={"space-between"}
      // wrap={'wrap'}
      // className={classes.container}
      >    
       <Grid container
       spacing={3}
       justify={'flex-end'}
       alignItems={'center'}
              >
      <Card className={classes.card}>
          <CardMedia className={classes.cardMedia} title="Image title">
            <img src={'https://64.media.tumblr.com/64eab0859cf319d597b50a5e15f2b609/6397400c1aa19fe4-b3/s1280x1920/5158b52dcf14390075830667ec15066738ce9277.png'} width="180"/>
          </CardMedia>
          </Card>
              </Grid>
      <form validate onSubmit={onSubmit}
      className={classes.form}
      >           
              <Grid 
              container
              direction={'column'}
              alignContent={'space-between'}  
              spacing={2}
              >
            <Grid item>
            <Typography
              variant={'h4'}
              align={'center'}
              color={'primary'}
              >
                 Login
              </Typography>
            </Grid>
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
            name={"password"}
            type={"password"}
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
          color={"primary"}
          fullWidth type="submit"
          > 
        Submit 
          </Button>
          </Grid>
        {/* <button type="submit" className="submit">
          Submit
        </button> */}
      </Grid>
      </form>
        </Grid>
    </div>
  );
}
