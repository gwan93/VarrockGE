import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { authContext } from '../AuthProvider';
import { makeStyles, Typography, TextField, Card, Button, CardContent, CardMedia, CssBaseline, Grid, Container } from '@material-ui/core';


export default function Collection(){
  const useStyles = makeStyles((theme) => ({
    main:{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(https://dw.convertfiles.com/files/0011087001619042393/circuitboard.gif)`,
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
      // textDecoration: 'inherit'
    },
    cardGrid: {
      padding: '0px 10px 10px 10px',
      borderRadius: '5px',
      // border: 'green 1px solid'
    },
    formGrid: {
      // border: 'red 1px solid',
      width: '80%'
    },
    grid: {
      // border: 'red 1px solid',
      display: 'flex', 
      justifyContent: "space-evenly"
    },
    card: {
      width: '300px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '5px 5px 5px 5px',
      border: '2px lightgrey solid',
      transition: 'box-shadow .1s',
      "&:hover": {
        boxShadow: '0 0 11px rgba(33,33,33,.2)'
      }
    },
    cardMedia: {
      display: 'flex',
      alignItems: 'center',
      height: '435px'
    },
    cardContent: {
      flexGrow: 1
    },
    submit: {
      margin: theme.spacing(1, 0, 2),
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#56144D"
      }
    },
    updateForm: {
      margin: theme.spacing(2, 0, 0),
    }
  }));
  const classes = useStyles();
  // const { widgetID } = useParams();
  // console.log('--------', useParams())
  const userID = useParams().id;
  let history = useHistory();
  const { collectionID } = useParams();
  const { state } = useContext(authContext);
  const [sellPrice, setSellPrice] = useState("");
  const [ collection, setCollection ] = useState({
    userProfile: {},
    collectionName: "",
    collectionDesc: "",
    collectionItems: [],
    checkedItems: []
  });
  // console.log('state', state)
  // console.log('collection', collection)

  const setCollectionName = (event) => {
    setCollection(prev => ({
      ...prev,
      collectionName: event.target.value
    }));
  };

  const setCollectionDesc = (event) => {
    setCollection(prev => ({
      ...prev,
      collectionDesc: event.target.value
    }));
  };
  const onSetSellPrice = (event) => {
    setSellPrice(event.target.value)
  };

  const onUpdateSellPrice = (widgetID, event) => {
    event.preventDefault();
    // console.log('1. onUpdateSellPrice clicked 118')
    updateSellPrice(widgetID)
  };

  const updateSellPrice = (widgetID) => {
    // console.log('2. updateSellPrice called by onUpdateSellPrice')
    
    // Sell price * 100 to convert it from decimal to integer
    // eg Convert 15.25 dollars to 1525 cents to prevent floating point conflicts in database
    axios.post(`/widgets/${widgetID}`,  {sellPrice: sellPrice * 100} )
    .then((response) => {
      // console.log('3. Axios Post response', response)
      history.go(0);
      // setSellPrice(
      

      // )
  })
  .catch((err) => {
    console.log("Something went wrong", err);
  });
  }
  // Retrieve collections from user
  // update userProfile to an object that includes the user's email,
  // user id, and a collection array
  useEffect(() => {

    // Retrieve User info and Collection Item data
    Promise.all([
      axios.get(`/user/${userID}`),
      axios.get(`/user/${userID}/collections/${collectionID}`)
    ])
    .then(all => {
      const [userResponse, collectionResponse] = all;
      if (collectionResponse.data[0]) {

        const widgetIDArray = [];
        for (const widget of collectionResponse.data) {
          widgetIDArray.push(widget.widget_id);
        }
        setCollection(prev => ({
          ...prev,
          userProfile: userResponse.data,
          collectionName: collectionResponse.data[0].list_name,
          collectionDesc: collectionResponse.data[0].list_description,
          collectionItems: collectionResponse.data.sort((a, b) => a.widget_id - b.widget_id),
          checkedItems: widgetIDArray
        }))

      } else {
        setCollection(prev => ({
          ...prev,
          userProfile: userResponse.data,
          collectionName: "",
          collectionDesc: "",
          collectionItems: []
        }))
      }
    })
  }, [userID, collectionID]);

  const onSubmit = (event) => {
    event.preventDefault();
    const postObject = {
      listName: collection.collectionName,
      listDesc: collection.collectionDesc,
      listItems: collection.checkedItems
    }
    if (collectionID === 'new') {
      // Create new list
      axios.post(`/user/${userID}/collections`, postObject)
      .then(response => {
        const {listID} = response.data;
        history.push(`/user/${userID}/collections/${listID}`);
      })
    } else {
      // Update existing list
      axios.post(`/user/${userID}/collections/${collectionID}`, postObject)
      .then(() => {
        history.go(0);
      })
    }
  }

  // Adds or removes the id integer from collection.checkedItems array
  const checkToggleWidget = (id) => {
    // if (collection.checkedItems.includes(id)) {
    //   const index = collection.checkedItems.indexOf(id);
    //   if (index > -1) {
    //     collection.checkedItems.splice(index, 1);
    //   }
    // } else {
    //   collection.checkedItems.push(id);
    // }
    // console.log('collection.checkedItems after toggling', collection.checkedItems)
    const newCheckedItems = [...collection.checkedItems];
    if (newCheckedItems.includes(id)) {
      const index = newCheckedItems.indexOf(id);
      if (index > -1) {
        newCheckedItems.splice(index, 1);
      }
    } else {
      newCheckedItems.push(id);
    }
    // console.log('newCheckedItems', newCheckedItems);
    setCollection(prev => ({
      ...prev,
      checkedItems:newCheckedItems
    }))
  };

  
  const usersWidgetsDetails = state.widgets
    .filter(widget => state.myWidgets.includes(widget.id))
    .sort((a, b) => a.id - b.id);



  const displayWidgets = usersWidgetsDetails.map(widget => {
    return(
      <div key={widget.id}>
        <input type="checkbox" checked={collection.checkedItems.includes(widget.id)} name={`${widget.name}`} onChange={()=>checkToggleWidget(widget.id)}></input>
        <label htmlFor={`${widget.name}`}>{widget.name}</label>
      </div>
    );
  })

  let displayCollections = [];
  if (collection.collectionItems.length !== 0) {
    displayCollections = collection.collectionItems.map(item => {
      // console.log('Item name:', item)
      return (
        <div key={item.widget_id}>
          <Grid item key={item.widget_id} /* xs={12} sm={6} md={4} */>
            <Card className={classes.card} variant="outlined">
              <CardMedia className={classes.cardMedia}>
                <img src={item.imgurl} width="280" alt=""/>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  <Link className={classes.textLink} to={`/widgets/${item.widget_id}`}>{item.name}</Link>
                </Typography>
                <div>
                  {/* {item.description} */}
                  {/* <li>Name: <Link to={`/widgets/${item.widget_id}`}>{item.name}</Link></li> */}
                  <li>Selling for: ${(item.current_sell_price_cents / 100).toFixed(2)}</li>
                  {/* <li>Description: {item.description}</li> */}
                  <li>Listed for sale: {String(item.for_sale_by_owner)}</li>
                  {/* <li>hash:{item.hash}</li> */}
                  {/* <li>MSRP_cents: {item.msrp_cents}</li> */}
                  <li>Rarity: {item.rarity_id}</li>
                  <li>Game: {item.subcategory_id}</li>

                  <form onSubmit={(event) => onUpdateSellPrice(item.widget_id, event)}>
                    <Grid className={classes.updateForm}>
                      <Grid item xs={8}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          label="Update Price ($)"
                          onChange={onSetSellPrice}
                          placeholder={String(item.current_sell_price_cents / 100)}
                        />
                      </Grid>
                    </Grid>
                    <Button type="submit" size="small" variant="contained" color="primary" className={classes.submit}>
                      Update
                    </Button>
                  </form>

                </div>
              </CardContent>
            </Card>
          </Grid>
        </div>
      );
    });
  }
  // console.log('displayCollections', displayCollections)
  
  return(
    <div>
      <CssBaseline />
      <main className={classes.main}>
        <div className={classes.container}>
          <Typography variant="body2" align="center" color="textSecondary">
            Viewing
          </Typography>

          <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
            {collection.userProfile.email}
          </Typography>
        </div>

        <div className={classes.container}>
          <Container className={classes.formGrid}>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    name="nameInput"
                    variant="outlined"
                    required
                    fullWidth
                    id="nameInput"
                    label="Collection Name"
                    onChange={setCollectionName}
                    value={collection.collectionName}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="descInput"
                    variant="outlined"
                    required
                    fullWidth
                    id="descInput"
                    label="Description"
                    onChange={setCollectionDesc}
                    value={collection.collectionDesc}
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" gutterBottom>
                Add or remove NFTs from this collection
              </Typography>
                {displayWidgets}
              <Button type="submit" size="medium" variant="contained" color="primary" className={classes.submit}>
                Save Changes
              </Button>
            </form>
          </Container>
        </div>

        <div className={classes.container}>
          <Container className={classes.cardGrid} /* maxWidth="md" */>
            <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
              NFTs in this collection
            </Typography>
            <Grid className={classes.grid} container spacing={3}>
              {displayCollections}
              {(!displayCollections || displayCollections.length === 0) && <h4>This collection does not have any widgets yet</h4>}
            </Grid>
          </Container>
        </div>
      </main>
    </div>
  );
}