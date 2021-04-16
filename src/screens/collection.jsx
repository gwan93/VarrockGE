import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Collection(){
  
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
      const collectionWidgets = collection.widgets.map(widget => {
        return (
          <div>
            <ul>
              <li>Name: {widget.name}</li>
              <li>Current_sell_price_cents: {widget.current_sell_price_cents}</li>
              <li>Description: {widget.description}</li>
              <li>For_sale_by_owner: {widget.for_sale_by_owner}</li>
              <li>hash:{widget.hash}</li>
              <li>MSRP_cents: {widget.msrp_cents}</li>
              <li>Rarity_id: {widget.rarity_id}</li>
              <li>Subcategory_id: {widget.subcategory_id}</li>
              <li>widget_id: {widget.widget_id}</li>
              <form>
                <label>Sell price: </label>
                <input></input>
              </form>
              <button>Sell</button>

            </ul>
          </div>
        );
      });
  
      return (
        <div>
          <Link to={`/user/${userID}/collections/${collection.collectionID}`} collectionWidgets={collectionWidgets}>
            <h2>{collection.collectionName} (collectionID: {collection.collectionID})</h2>
          </Link>
          <h2>{collectionWidgets}</h2>
        </div>
      );
    });
  }
  
  return(
    <div>
      <h2>User: {userProfile.email}</h2>

      Change list Name input field
      change list description input field
      <h3>Widgets</h3>
      <ul>
        <li>Widget1 []</li>
        <li>Widget2 []</li>
        <li>...</li>

      </ul>

      <button>Save</button>
      <h3>Collections:</h3>
      {displayCollections}
      {(!displayCollections || displayCollections.length === 0) && <h4>User does not have any collections yet</h4>}
    </div>
  );

}