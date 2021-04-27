import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "black",
    position: 'fixed',
    top: '0',
    height: '70px'
  },

  title: {
    flexGrow: 1, 
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
          <img
            src="https://i.imgur.com/hZMZGsi.jpg"
            width="40"
            className={classes.image}
            alt=""
          ></img>
          <Typography
            variant="h6"
            align="inherit"
            className={classes.title}
            color="inherit"
            style={{ textDecoration: "none" }}
            component={Link}
            to="/"
          >
            Home
          </Typography>
          {state.user.isadmin && (
            <Typography
              variant="h6"
              align="inherit"
              className={classes.title}
              color="inherit"
              style={{ textDecoration: "none" }}
              component={Link}
              to="/admin"
            >
              Admin
            </Typography>
          )}
          <Typography
            variant="h6"
            align="inherit"
            className={classes.title}
            color="inherit"
            style={{ textDecoration: "none" }}
            component={Link}
            to="/widgets"
          >
            NFT Marketplace
          </Typography>
          <Typography
            variant="h6"
            className={classes.title}
            color="inherit"
            style={{ textDecoration: "none" }}
            component={Link}
            to={`/user/${userID}/collections`}
          >
            My Collections
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
              <ShoppingCartOutlinedIcon /> Cart ({state.itemsInCart.length})
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
