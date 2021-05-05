import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { AppBar, Toolbar, Button, Menu, MenuItem, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

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
    color: "white",
    fontSize: "1.5em",
    fontWeight: "500",
    margin: "0 0.3em 0 0.5em",
  },
  image: {
    flexGrow: 0.3,
    marginLeft: "-25px",
    marginRight: "25px",
    background: "black",
    width: 40
  },
  collections: {
    textTransform: 'unset',
    color: "inherit",
    padding: 0,
  },
  dropdownItem: {
    textDecoration: "none",
    color: "black"
  }
}));

export default function Navigation() {
  const classes = useStyles();
  const { state } = useContext(authContext);
  const userID = state.user.id;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderCollections = () => {
    const collectionList = state.collections.map(collection => {
      return (
        <MenuItem key={collection.id} onClick={handleClose}>
          <Link to={`/user/${userID}/collections/${collection.id}`} className={classes.dropdownItem}>
            {collection.name}
          </Link>
        </MenuItem>
      );
    })
    return collectionList;
  };

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.navBar}>

          <div className={classes.navLeft}>
            <img src="https://i.imgur.com/hZMZGsi.jpg" className={classes.image}alt=""></img>
            <Link to="/" className={classes.navTitle}>Home</Link>
            {state.user.isadmin && <Link to="/admin" className={classes.navTitle}>Admin</Link>}
            <Link to="/widgets" className={classes.navTitle}>NFT Marketplace</Link>
            <div>
              <Button onClick={handleClick} className={classes.collections} style={{ backgroundColor: 'transparent'}}>
                <Typography className={classes.navTitle}>
                  My Collections <KeyboardArrowDownIcon/>
                </Typography>
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                className={classes.navDropdown}
              >
                <MenuItem onClick={handleClose}>
                  <Link to={`/user/${userID}/collections/`} className={classes.dropdownItem}>
                    My Collections
                  </Link>
                </MenuItem>
                <Divider />
                {renderCollections()}
                <Divider />
                <MenuItem onClick={handleClose}>
                  <Link to={`/user/${userID}/collections/new`} className={classes.dropdownItem}>
                    Add New Collection
                  </Link>
                </MenuItem>
              </Menu>
            </div>
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
