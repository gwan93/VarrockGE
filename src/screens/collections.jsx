import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Collections(){
  
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
      setUserProfile(prev => ({
        ...prev,
        id: userResponse.data.id,
        email: userResponse.data.email
      }));
      const collectionPromises = collectionsResponse.data.map(aCollectionData => axios.get(`/user/1/collections/${aCollectionData.id}`));
      Promise.all(collectionPromises)
      .then(collectionPromisesResults => {
        console.log('collectionPromisesResults', collectionPromisesResults)
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
      console.log('!@@#$', collection)
  
      return (
        <div>
          <Link to={`/user/${userID}/collections/${collection.collectionID}`}>
            <h2>{collection.collectionName} (collectionID: {collection.collectionID})</h2>
          </Link>
        </div>
      );
    });
  }
  
  return(
    <div>
      <h2>User: {userProfile.email}</h2>
      <h3>Collections:</h3>
      {displayCollections}
      {(!displayCollections || displayCollections.length === 0) && <h4>User does not have any collections yet</h4>}
      <Link to={`/user/${userProfile.id}/collections/new`}>New Collection</Link>
    </div>
  );

}


// /user/2
// Email
// Wallet balance
// A link that goes to collections -> /user/2/collections
// Show all the widgets a user owns here

// /user/2/collections
// Dont even show widgets here
// Pokemon collections (collectionID) -> /user/2/collections/1
// Yugioh collections (collectionID) -> /user/2/collections/1
// New Collection -> /user/2/collections/new

// /user/2/collections/new AND /user/2/collections/1
// Show all the widgets a user owns here
// A form to change list name
// Form to change list desc
// Button to submit
