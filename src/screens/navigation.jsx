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
  flexGrow: 1,
   display: "flex",
   justifyContent: "flex-end",
  
 },

  login: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    // wordSpacing: "5px",
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const { state } = useContext(authContext);
  const userID = state.user.id;

  console.log("nav state", state);

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
              User: {state.user.email}
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

    // <div className={classes.root}>
    //   <AppBar position="static">
    //     <Toolbar>
    //     <Typography variant="h6" className={classes.title}>
    //     <Link href="/" color="inherit" style={{ textDecoration: 'none'}}>Home </Link>
    //   {state.user.isadmin && <Link href="/admin" color="inherit" style={{ textDecoration: 'none'}}>Admin </Link>}
    //   <Link href="/widgets" color="inherit" style={{ textDecoration: 'none'}}>Widgets </Link>
    //   <Link href={`/user/${userID}/collections`} color="inherit" style={{ textDecoration: 'none'}}>Collections </Link>
    //   {state.user.id && <Link href={`/user/${userID}`} color="inherit" style={{ textDecoration: 'none'}}>User: {state.user.email}</Link>}
    //   </Typography>
    //   {state.user.id && <Link href="/cart" color="inherit" className={classes.login}><ShoppingCartOutlinedIcon/>({state.itemsInCart.length}) </Link>}
    //   <Button color="inherit" className={classes.login}>
    //   {!state.user.id && <Link href="/login" color="inherit">Login </Link>}
    //   {state.user.id && <Link href="/login" color="inherit">Logout </Link>}
    //   </Button>
    //   </Toolbar>
    //   </AppBar>
    // </div>
  );
}
