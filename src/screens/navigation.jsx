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
  navBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  navLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  navRight: {
    display: "flex",
    flexdirection: "row",
  },
  navTitle: {
    display: "flex",
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
    fontSize: "1.5em",
    fontWeight: "500",
    margin: "0 0.3em 0 0.5em"
  },
  image: {
    flexGrow: 0.3,
    marginLeft: "-25px",
    marginRight: "25px",
    background: "black",
    width: 40
    
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const { state } = useContext(authContext);
  const userID = state.user.id;

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.navBar}>

          <div className={classes.navLeft}>
            <img src="https://i.imgur.com/hZMZGsi.jpg" className={classes.image}alt=""></img>
            <Link to="/" className={classes.navTitle}>Home</Link>
            {state.user.isadmin && <Link to="/admin" className={classes.navTitle}>Admin</Link>}
            <Link to={`/user/${userID}/collections`} className={classes.navTitle}>NFT Marketplace</Link>
            <Link to={`/user/${userID}`} className={classes.navTitle}>My Collections</Link>
          </div>

          <div className={classes.navRight}>
            {state.user.id && <Link to={`/user/${userID}`} className={classes.navTitle}>{state.user.email}</Link>}
            {state.user.id && <Link to="/cart" className={classes.navTitle}><ShoppingCartOutlinedIcon /> Cart ({state.itemsInCart.length})</Link>}
            {!state.user.id && <Link to="/login" className={classes.navTitle}>Login</Link>}
            {state.user.id && <Link to="/login" className={classes.navTitle}>Logout</Link>}
          </div>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
