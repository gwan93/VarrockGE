import { createContext, useState, useEffect } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
import history from './History';


export default function AuthProvider(props) {
  // This is the wrapper
  // This wraps the App component
  // The wrapper provides all the state for the app
  const [auth, setAuth] = useState(false);

  // console.log('history is', history);
  const [id, setId] = useState();
  const [user, setUser] = useState({ email: "", name: "", });
  // console.log("initializing auth")

  const [state, setState] = useState({
    user: {
      balance: 10000,
      id: 1,
      isadmin: true,
      email: "jesse@jesse.com"
    },
    widgets: [], // an array of objects
    collections: [], // an array of objects
    itemsInCart: [] // an array of objects
  })

  console.log('@@@', state);
  // document.cookie="line=line26"
  // console.log('reading cookie', Cookies.get('session'));

  // Perform login process for the user & save authID, etc
  const loginUser = function (email, password) {
    axios.post('/login', { email, password })
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
        setUser({ email, id, name: "Test User" })
        setAuth(true)
        history.push("/widgets");
      })
      .catch(err => {
        console.log('Your credentials were not valid. Please try again', err)
      })
  };


  const logoutUser = function (email, password) {
    setUser({ email: "", name: "" });
    setId(uuid()); //// ?? why here
    setAuth(false);
  };

  useEffect(() => {

    Promise.all([
      axios.get('/user/:id'),
      axios.get('/user/1/collections'),
      axios.get('/widgets'),
    ])
      .then(all => {
        // Getting response
        console.log('AHHHHHHHIMLOGGING', all)
        const [userData, collectionsData, widgetsData] = all
        console.log(userData.data);
        console.log(collectionsData.data);
        console.log("lewidget", widgetsData)
        // Set state based on the response
        setState(prev => ({
          ...prev,
          collections: collectionsData.data,
          widgets: widgetsData.data

        }))
        //line below retrieves all collections for a given user. 
        const collectionPromises = collectionsData.data.map(aCollectionData => axios.get(`/user/1/collections/${aCollectionData.id}`));
        Promise.all(collectionPromises)
          .then(collectionPromisesResults => {
            //collectionPromisesResults contains all collections in an array of axios responses.
            console.log("collectionPromises", collectionPromisesResults)
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
            setState(prev => ({
              ...prev,
              collections: stateCollections
            }));
            console.log('MYFINALState', state)
          });
        // for (const id in collectionsData.data) {
        //   console.log('id is', id)
        //   axios.get(`/user/1/collections/${collectionsData.id}`)
        //     .then(response => {
        //       console.log('idcollectionsthingforgio', response.data)
        //       // console.log('id[widget]', id[widget_id])
        //       setState(prev => ({
        //         ...prev,
        //         [id["widgets"]]: response.data
        //       }))
        //     })
        // }
      })
      .catch(err => {
        console.log('@@@@@@@@@@@@@@@@', err)
      })
  }, []);

  // authContext will expose these items
  const userData = { state, setState, auth, user, loginUser, logoutUser };  

  // We can use this component to wrap any content we want to share this context
  return (
    // Provider provides the userData object to props.children
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};

export const authContext = createContext();