import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authContext } from '../AuthProvider';
import { makeStyles, Typography, CssBaseline, Grid, Container } from '@material-ui/core';
import ProductCard from '../components/ProductCard';

const useStyles = makeStyles((theme) => ({
  main:{
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(https://i.imgur.com/WEBV8Q1.gif)`,
    backgroundPosition: "center center",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '75px'
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 6),
    border: 'rgb(224, 224, 224) 2px solid',
    borderRadius: '5px',
    width: "960px",
    margin: '8px 0 8px 0',
    transition: 'box-shadow .1s',
    "&:hover": {
      boxShadow: '0 0 11px rgba(33,33,33,.2)'
    }
  },
  textLink: {
    color: 'inherit',
  },
  cardGrid: {
    padding: '20px 10px 10px 10px',
    // border: 'rgb(224, 224, 224) 2px solid',
    borderRadius: '5px',
    marginBottom: '20px'
  },
}));

export default function User(){
  const classes = useStyles();
  const userID = Number(useParams().id);
  const { state } = useContext(authContext);
  const [ userProfile, setUserProfile ] = useState({
    id: null,
    email: "",
    balance: null,
    isadmin: null,
    password: "",
    userWidgets: []
  });

  // console.log('state', state)
  // console.log('userProfile', userProfile)
  
  useEffect(() => {
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/user/${userID}`),
      axios.get(`${process.env.REACT_APP_API_URL}/widgets/owners`)
    ])
    .then(all => {
      const [ userResponse, widgetOwnersResponse ] = all;

      // Filtering the array of widget owners to only include widgets
      // owned by the user of the profile being visited
      // Note: these elements do not have the widget's name, description, etc...
      const ownedWidgets = widgetOwnersResponse.data.filter(widgetOwner => {
        return widgetOwner.user_id === userID;
      });

      // Create array that consists of this user's owned widgets' IDs
      const ownedWidgetsID = [];
      for (const ownedWidget of ownedWidgets) {
        ownedWidgetsID.push(ownedWidget.widget_id);
      };

      // Filter all existing widgets stored in state based on the above created array
      // ie if ownedWidgets = [1, 2, 3], then make an array with the details of widgets 1, 2, 3
      const ownedWidgetsDetails = state.widgets.filter(widget => {
        // console.log('widget', widget)
        return ownedWidgetsID.includes(widget.id)
      });

      setUserProfile((prev) => ({
        ...prev,
        ...userResponse.data,
        userWidgets: ownedWidgetsDetails
      }));

    })
  }, [userID, state.widgets]);

  const displayWidgets = userProfile.userWidgets.map((widget) => {
    return (
      <ProductCard
        key={widget.id}
        id={widget.id}
        imgurl={widget.imgurl}
        description={widget.description}
        rarity_id={widget.rarity_id}
        subcategory_id={widget.subcategory_id}
        name={widget.name}
        msrp_cents={widget.msrp_cents}
        for_sale_by_owner={widget.for_sale_by_owner}
        hash={widget.hash}
        current_sell_price_cents={widget.current_sell_price_cents}
      />
    );
  });

  return(
    <div>
      <CssBaseline />
      <main className={classes.main}>
        <div className={classes.container}>
          <Container>
            <Typography variant="body2" align="center" color="textSecondary">
              Viewing
            </Typography>

            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              {userProfile.email}
            </Typography>

            {/* <Typography variant="body2" align="center" color="textSecondary">
              Wallet Balance: ${userProfile.balance / 100}
            </Typography>

            <Typography variant="body2" align="center" color="textSecondary">
              Admin Status: {String(userProfile.isadmin)}
            </Typography> */}

          </Container>
          
        </div>

        <div className={classes.container}>
          <Container>
            <div align="center">
                <Link className={classes.textLink} to={`/user/${userID}/collections`}>
                  <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                    View Collections
                  </Typography>
                </Link>
            </div>
          </Container>
        </div>

        <div className={classes.container}>
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
              {userProfile.email}'s NFTs
            </Typography>
            <Grid container spacing={3}>
              {displayWidgets}
            </Grid>
          </Container>
        </div>

      </main>
    </div>
  );
};
