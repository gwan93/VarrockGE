import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authContext } from '../AuthProvider';
import { Typography, Card, Button, CardActions, CardContent, CardMedia, CssBaseline, Grid, Container } from '@material-ui/core';
import useStyles from './styles';

export default function User(){
  const classes = useStyles(); //

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
  console.log('state', state)

  // console.log('userProfile', userProfile)
  
  useEffect(() => {
    Promise.all([
      axios.get(`/user/${userID}`),
      axios.get('/widgets/owners')
    ])
    .then(all => {
      const [ userResponse, widgetOwnersResponse ] = all;

      // console.log('widgetOwnersResponse.data', widgetOwnersResponse.data)

      // Filtering the array of widget owners to only include widgets 
      // owned by the user of the profile being visited
      // Note: these elements do not have the widget's name, description, etc...
      const ownedWidgets = widgetOwnersResponse.data.filter(widgetOwner => {
        return widgetOwner.user_id === userID;
      });

      // console.log('ownedWidgets', ownedWidgets)

      // Create array that consists of this user's owned widgets' IDs
      const ownedWidgetsID = [];
      for (const ownedWidget of ownedWidgets) {
        ownedWidgetsID.push(ownedWidget.widget_id);
      };

      // console.log('ownedWidgetsID', ownedWidgetsID)

      // Filter all existing widgets stored in state based on the above created array
      // ie if ownedWidgets = [1, 2, 3], then make an array with the details of widgets 1, 2, 3
      const ownedWidgetsDetails = state.widgets.filter(widget => {
        // console.log('widget', widget)
        return ownedWidgetsID.includes(widget.id)
      });

      // console.log('ownedWidgetsDetails', ownedWidgetsDetails)

      setUserProfile(prev => ({
        ...prev,
        ...userResponse.data,
        userWidgets: ownedWidgetsDetails
      }));

    })
  }, [userID, state.widgets]);

  const displayWidgets = userProfile.userWidgets.map(widget => {
    console.log(widget.imgurl)
    return(
      <Grid item key={widget.id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia className={classes.cardMedia} title="Image title">
            <img src={widget.imgurl} width="298"/>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {widget.name}
            </Typography>
            <Typography>
              WidgetID {widget.id}: {widget.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">View</Button>
            <Button size="small" color="primary"><Link to={`/widgets/${widget.id}`}>Clickme</Link></Button>
            <Button size="small" color="primary">Edit</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return(
    <div>
      <CssBaseline />
      <main>
        <div className={classes.container}>
          <Container>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Email: {userProfile.email}
            </Typography>

            <Typography variant="h5" align="center" color="textSecondary">
              Wallet Balance: {userProfile.balance}
            </Typography>

            <Typography variant="h5" align="center" color="textSecondary">
              Admin Status: {String(userProfile.isadmin)}
            </Typography>
            
            <div align="center" className={classes.button}>
              <Button variant="outlined" color="primary">
                <Link to={`/user/${userID}/collections`}><h2>View {userProfile.email}'s Collections</h2></Link>
              </Button>
            </div>

            <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
              {userProfile.email}'s widgets
            </Typography>

          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {displayWidgets}
          </Grid>
        </Container>
      </main>
    </div>
  );
};
