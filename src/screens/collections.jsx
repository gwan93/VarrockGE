import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles, Typography, Card, CardContent, CssBaseline, Grid, Container } from '@material-ui/core';

export default function Collections(){
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
    button: {
      marginTop: '40px',
    },
    textLink: {
      color: 'inherit',
      textDecoration: 'inherit'
    },
    cardGrid: {
      padding: '0px 10px 10px 10px',
      borderRadius: '5px',
      width: '960px',
    },
    collections: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      // border: 'red 1px solid'
    },
    card: {
      height: '100%',
      width: '455px',
      margin: '10px 5px 10px 5px',
      // border: 'blue 1px solid',
      transition: 'box-shadow .1s',
      "&:hover": {
        boxShadow: '0 0 11px rgba(33,33,33,.2)'
      }
    },
    cardContent: {
      flexGrow: 1
    }
  }));
  const classes = useStyles();
  
  const userID = useParams().id;
  const [ userProfile, setUserProfile ] = useState({});


  
  
  // Retrieve collections from user
  // update userProfile to an object that includes the user's email,
  // user id, and a collection array
  useEffect(() => {
    Promise.all([
      axios.get(`/user/${userID}`),
      axios.get(`/user/${userID}/collections`)
    ])
    .then(all => {
      const [userResponse, collectionsResponse] = all;
      // console.log('collectionsResponse', collectionsResponse)
      setUserProfile(prev => ({
        ...prev,
        id: userResponse.data.id,
        email: userResponse.data.email
      }));
      
      const collectionPromises = collectionsResponse.data.map(aCollectionData => axios.get(`/user/1/collections/${aCollectionData.id}`));
      Promise.all(collectionPromises)
      .then(collectionPromisesResults => {
        // console.log('collectionPromisesResults', collectionPromisesResults)
        const stateCollections = [];
        for (const collectionPromiseResult of collectionPromisesResults) {
          if (collectionPromiseResult.data.length !== 0) {
            const collection = {
              collectionID: collectionPromiseResult.data[0].list_id,
              collectionName: collectionPromiseResult.data[0].list_name,
              collectionDescription: collectionPromiseResult.data[0].list_description,
              widgets: collectionPromiseResult.data
            }
            stateCollections.push(collection);
          }
        }
        setUserProfile(prev => ({
          ...prev,
          collections: stateCollections
        }))
      })
    })
  }, [userID]);

  let displayCollections;
  if (userProfile.collections) {
    displayCollections = userProfile.collections.map(collection => {
      // console.log('!@@#$', collection)
  
      return (
        <div key={collection.collectionID}>
          <Link className={classes.textLink} to={`/user/${userID}/collections/${collection.collectionID}`}>
            <Grid item md={6}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography component="h2" variant="h5" align="center">
                    {collection.collectionName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Link>
        </div>
      );
    });
  }
  
  return(
    <div>
        <CssBaseline />
        <main className={classes.main}>
          <div className={classes.container}>
            <Typography variant="body2" align="center" color="textSecondary">
              Viewing
            </Typography>

            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              {userProfile.email}
            </Typography>
          </div>

          <div className={classes.container}>
            <Container>
              <div align="center">
                  <Link className={classes.textLink} to={`/user/${userProfile.id}/collections/new`}>
                    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                      Create A New Collection
                    </Typography>
                  </Link>
              </div>
            </Container>
          </div>

          <div className={classes.container}>
            <Container className={classes.cardGrid}>
              <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                {userProfile.email}'s collections
              </Typography>
              <Grid className={classes.collections}>
                {displayCollections}
                {(!displayCollections || displayCollections.length === 0) && <h4>User does not have any collections yet</h4>}
              </Grid>
            </Container>
          </div>
        </main>
    </div>
  );
}