import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import history from './History';
require('dotenv').config({path: './.env'});


export default function AuthProvider(props) {
  const [state, setState] = useState({
    user: {
      balance: 10000,
      id: 3,
      isadmin: true,
      email: "gio@gio.com"
    },
    widgets: [], // an array of objects
    collections: [], // an array of objects
    itemsInCart: [], // an array of objects
    myWidgets: []
  })
  // console.log('state', state)

  // Perform login process for the user & save authID, etc
  const loginUser = function (email, password) {
    axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
      .then(response => {
        setState(prev => ({
          ...prev,
          user: {
            balance: response.data.balance,
            id: response.data.id,
            isadmin: response.data.isadmin,
            email: response.data.email
          }
        }))
        history.push("/widgets");
      })
      .catch(err => {
        console.log('Your credentials were not valid. Please try again', err)
      })
  };


  const logoutUser = function (email, password) {
    // setUser({ email: "", name: "" });
    // setId(uuid()); //// ?? why here
    // setAuth(false);
  };

  useEffect(() => {

    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/user/3/collections`),
      axios.get(`${process.env.REACT_APP_API_URL}/widgets`),
      axios.get(`${process.env.REACT_APP_API_URL}/widgets/owners`)
    ])
      .then(all => {
        // Getting response
        const [collectionsData, widgetsData, widgetOwnersData] = all
        // console.log(collectionsData.data);
        // console.log("lewidget", widgetsData)
        // console.log(widgetOwnersData)
        //
        const myWidgetsID = [];
        widgetOwnersData.data.filter(widget => {
          if (widget.user_id === state.user.id) {
            return myWidgetsID.push(widget.widget_id)
          }
        })
        // Set state based on the response
        setState(prev => ({
          ...prev,
          collections: collectionsData.data,
          widgets: widgetsData.data,
          myWidgets: myWidgetsID

        }))
        //line below retrieves all collections for a given user. 
        const collectionPromises = collectionsData.data.map(aCollectionData => axios.get(`${process.env.REACT_APP_API_URL}/user/1/collections/${aCollectionData.id}`));
        Promise.all(collectionPromises)
          .then(collectionPromisesResults => {
            //collectionPromisesResults contains all collections in an array of axios responses.
            // console.log("collectionPromises", collectionPromisesResults)
            //build a collection object with the for loop below
            const stateCollections = []
            for (const collectionPromiseResult of collectionPromisesResults) {
              // const collection = collectionPromisesResult.data;
              //if our collection does not have any widgets, we will need to find a way to define the behaviour because index 0 will not exist. // FIXED BY GIO :D
              //96 - 100 should actually be returned by the API in this format. We should just have to use line 101. 
              if (collectionPromiseResult.data.length !== 0) {
                const collection = {
                  collectionName: collectionPromiseResult.data[0].list_name,
                  collectionDescription: collectionPromiseResult.data[0].list_description,
                  widgets: collectionPromiseResult.data
                };
                stateCollections.push(collection);
              }
            }
            // setState(prev => ({
            //   ...prev,
            //   collections: stateCollections
            // }));
          });
      })
      .catch(err => {
        console.log('Error retrieving data:', err)
      })
  }, [state.user.id]);

  // authContext will expose these items
  const userData = { state, setState, loginUser, logoutUser };  

  // We can use this component to wrap any content we want to share this context
  return (
    // Provider provides the userData object to props.children
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};

export const authContext = createContext();