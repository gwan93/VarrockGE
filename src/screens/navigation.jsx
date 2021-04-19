import { useContext } from "react";
// import { Link } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { Typography, AppBar, Toolbar, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
  title: {
    flexGrow: 1,
    wordSpacing: "10px",
    textDecoration: "none"
  },

  login: {
    display: 'flex',
    wordSpacing: "15px",
    justifyContent: "flex-end"
  }
}));

export default function Navigation() {
  const classes = useStyles();
  const { state } = useContext(authContext);
  const userID = state.user.id;

  console.log('nav state', state);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
        <Link href="/" color="inherit" style={{ textDecoration: 'none'}}>Home </Link>
      {state.user.isadmin && <Link href="/admin" color="inherit" style={{ textDecoration: 'none'}}>Admin </Link>}
      <Link href="/widgets" color="inherit" style={{ textDecoration: 'none'}}>Widgets </Link>
      <Link href={`/user/${userID}/collections`} color="inherit" style={{ textDecoration: 'none'}}>Collections </Link>
      {state.user.id && <Link href={`/user/${userID}`} color="inherit" style={{ textDecoration: 'none'}}>User: {state.user.email}</Link>}
      </Typography>
      {state.user.id && <Link href="/cart" color="inherit" className={classes.login}><ShoppingCartOutlinedIcon/>({state.itemsInCart.length}) </Link>}
      <Button color="inherit" className={classes.login}>
      {!state.user.id && <Link href="/login" color="inherit">Login </Link>}
      {state.user.id && <Link href="/login" color="inherit">Logout </Link>}
      </Button>
      </Toolbar>
      </AppBar>
    </div>
  );
}
