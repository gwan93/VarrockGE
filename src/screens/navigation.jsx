import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "black"
  },

  title: {
    flexGrow: 1,
    // display: "inline-flex",
    // justifyContent: "space-evenly",
  
  },

  user: {
   flexGrow: 30,
   display: "flex",
   justifyContent: "flex-end",
 },

 cart: {
  flexGrow: 0.5,
   display: "flex",
   justifyContent: "flex-end",
  
 },

  login: {
    flexGrow: 0.5,
    display: "flex",
    justifyContent: "flex-end",
  },

  image: {
    flexGrow: 0.3,
    marginLeft: "-25px",
    marginRight: "25px",
    background: "black"
    
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const { state } = useContext(authContext);
  const userID = state.user.id;

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
        <img src="https://i.imgur.com/hZMZGsi.jpg" width="50" className={classes.image}>
        </img>
          <Typography
            variant='h6'
            align='inherit'
            className={classes.title}
            component={Link}
            to="/"
          >
            <img src="https://bit.ly/3tCtk2g" width="60"></img>
            
          </Typography>
          {state.user.isadmin && (
            <Typography
            variant='h6'
            align='inherit'
              className={classes.title}
              component={Link}
              to="/admin"
            >
              <img src="https://bit.ly/3dD4fyK" width="70"></img>
            </Typography>
          )}
          <Typography
            variant='h4'
            align='inherit'
            className={classes.title}
            component={Link}
            to="/widgets"
          >
            <img src="https://bit.ly/3uYoRXY" width="125"></img>
          </Typography>
          <Typography
            variant='h6'
            className={classes.title}
            component={Link}
            to={`/user/${userID}/collections`}
          >
            <img src="https://bit.ly/3tBojXz" width="120"></img>
          </Typography>
          {state.user.id && (
            <Typography
              className={classes.user}
              color="inherit"
              style={{ textDecoration: "none" }}
              component={Link}
              to={`/user/${userID}`}
            >
            {state.user.email}
            </Typography>
          )}
          {state.user.id && (
            <Typography
              className={classes.cart}
              color="inherit"
              style={{ textDecoration: "none" }}
              component={Link}
              to="/cart"
            >
              <ShoppingCartOutlinedIcon /> ({state.itemsInCart.length})
            </Typography>
          )}
          {!state.user.id && (
            <Typography
              className={classes.login}
              color="inherit"
              style={{ textDecoration: "none" }}
              component={Link}
              to="/login"
            >
              Login
            </Typography>
          )}
          {state.user.id && (
            <Typography
              className={classes.login}
              color="inherit"
              style={{ textDecoration: "none" }}
              component={Link}
              to="/login"
            >
              Logout
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
