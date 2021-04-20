import React from "react";
import { useHistory, Link } from "react-router-dom";
import { CssBaseline, Paper, TextField, Button, makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paperContainer:{
    height: 1070,
    backgroundImage: `url(https://scontent.fyvr1-1.fna.fbcdn.net/v/t1.15752-9/175096321_164067965601096_8611238032525775896_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=ae9488&_nc_ohc=W55_8YwHjK4AX8KHyKR&_nc_ht=scontent.fyvr1-1.fna&oh=f9f7e99da3812e5c3d667f5b0b242cc1&oe=60A2BAD4)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover"
  },
  buttonContainer: {
    marginTop: '1em',
    marginLeft: '1em'
  }
  // Typography:{

  // },
}))

export default function Home({setNavbar}) {
  let classes = useStyles();
  let history = useHistory();
  const redirectLogin = () => {
    history.push('/login')
  }
  const redirectWidget = () => {
    history.push('/widgets')
  }
  
  return (
    <div>
      <CssBaseline>
        {/* <Grid
          container
        >
          <Grid 
          item */}
          {/* /> */}
          <Paper
          className={classes.paperContainer}
          >
              {/* </Grid> */}
      {/* <img src="https://scontent.fyvr1-1.fna.fbcdn.net/v/t1.15752-9/175096321_164067965601096_8611238032525775896_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=ae9488&_nc_ohc=W55_8YwHjK4AX8KHyKR&_nc_ht=scontent.fyvr1-1.fna&oh=f9f7e99da3812e5c3d667f5b0b242cc1&oe=60A2BAD4" alt="elbaby"/> */}
      <div> 
        {/* <Grid
        item
      > */}
      {/* <Link to="/login" className="btn btn-primary">Login</Link>
      <Link to="/widgets" className="btn btn-primary">Marketplace</Link> */}
      <Grid
      container
      alignContent={"flex-end"}
      alignItems={"flex-end"}
      justify={"flex-start"}
      spacing={"2"}
      >
      <Grid
      item
      >
      <Button
       className={classes.buttonContainer}
       color={"primary"}
       onClick={redirectLogin}
       size={"large"}
       variant={"contained"}
       textSizeLarge
       > 
       Login
      </Button>
       </Grid>
       <Grid
       item
       >
      <Button
      onClick={redirectWidget}
      color={"secondary"}
      size={"large"}
      variant={"contained"}
      >MarketPlace
      </Button>
      </Grid>
      </Grid>
        {/* </Grid> */}
      </div>
      </Paper>
        {/* </Grid> */}
      </CssBaseline>
    </div>
 
  );
}
