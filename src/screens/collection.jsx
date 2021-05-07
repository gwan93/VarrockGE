import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { authContext } from '../AuthProvider';
import { makeStyles, Typography, TextField, Button, CssBaseline, Grid, Container } from '@material-ui/core';
import ProductCard from '../components/ProductCard';

export default function Collection(){
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
      // textDecoration: 'inherit'
    },
    cardGrid: {
      padding: '0px 10px 10px 10px',
      borderRadius: '5px',
      // border: 'green 1px solid',
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
    },
    productCards: {
      // display: 'flex',
      // flexDirection: 'row',
      justifyContent: 'center'
    }
  }));
  const classes = useStyles();
  const userID = useParams().id;
  let history = useHistory();
  const { collectionID } = useParams();
  const { state } = useContext(authContext);
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

  // Retrieve collections from user
  // update userProfile to an object that includes the user's email,
  // user id, and a collection array
  useEffect(() => {

    // Retrieve User info and Collection Item data
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/user/${userID}`),
      axios.get(`${process.env.REACT_APP_API_URL}/user/${userID}/collections/${collectionID}`)
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
      axios.post(`${process.env.REACT_APP_API_URL}/user/${userID}/collections`, postObject)
      .then(response => {
        const {listID} = response.data;
        history.push(`/user/${userID}/collections/${listID}`);
      })
    } else {
      // Update existing list
      axios.post(`${process.env.REACT_APP_API_URL}/user/${userID}/collections/${collectionID}`, postObject)
      .then(() => {
        history.go(0);
      })
    }
  }

  // Adds or removes the id integer from collection.checkedItems array
  const checkToggleWidget = (id) => {
    const newCheckedItems = [...collection.checkedItems];
    if (newCheckedItems.includes(id)) {
      const index = newCheckedItems.indexOf(id);
      if (index > -1) {
        newCheckedItems.splice(index, 1);
      }
    } else {
      newCheckedItems.push(id);
    }
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
    displayCollections = collection.collectionItems.map(widget => {
      // console.log('Item name:', item)
      return (
        <div key={widget.id}>
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
            <Grid /* container spacing={4} */ className={classes.productCards}>
              {displayCollections}
              {(!displayCollections || displayCollections.length === 0) && <h4>This collection does not have any widgets yet</h4>}
            </Grid>
          </Container>
        </div>
      </main>
    </div>
  );
}