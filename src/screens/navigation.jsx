import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}));

export default function Navigation() {
  const classes = useStyles();
  const { state } = useContext(authContext);
  const userID = state.user.id;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
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
            className={classes.title}
            color="inherit"
            style={{ textDecoration: "none" }}
            component={Link}
            to="/widgets"
          >
            Widgets
          </Typography>
          <Typography
            variant="h6"
            className={classes.title}
            color="inherit"
            style={{ textDecoration: "none" }}
            component={Link}
            to={`/user/${userID}/collections`}
          >
            Collections
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
