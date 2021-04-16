import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Collection(){
  
  const userID = useParams().id;
  const { collectionID } = useParams();
  const [ state, setState ] = useState({
    userProfile: {},
    collectionName: "",
    collectionDesc: "",
    collectionItems: []
  });

  const setCollectionName = (event) => {
    setState(prev => ({
      ...prev,
      collectionName: event.target.value
    }));
  };

  const setCollectionDesc = (event) => {
    setState(prev => ({
      ...prev,
      collectionDesc: event.target.value
    }));
  };

  const setCollectionItems = (event) => {
    console.log('setCollectionItems');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Clicked')
    //axios Post request;
  }

  // Retrieve collections from user
  // update userProfile to an object that includes the user's email,
  // user id, and a collection array
  useEffect(() => {
    Promise.all([
      axios.get(`/user/${userID}`),
      axios.get(`/user/${userID}/collections/${collectionID}`)
    ])
    .then(all => {
      const [userResponse, collectionResponse] = all;
      // console.log(userResponse.data)
      // console.log(collectionResponse.data)
      setState(prev => ({
        ...prev,
        userProfile: userResponse.data,
        collectionName: collectionResponse.data[0].list_name,
        collectionDesc: collectionResponse.data[0].list_description,
        collectionItems: collectionResponse.data
      }))
    })
  }, [userID, collectionID]);

  const displayCollections = state.collectionItems.map(item => {
    // console.log('Item name:', item)
      return (
        <div>
          <ul>
            <li>Name: <Link to={`/widgets/${item.widget_id}`}>{item.name}</Link></li>
            <li>Current_sell_price_cents: {item.current_sell_price_cents}</li>
            <li>Description: {item.description}</li>
            <li>For_sale_by_owner: {item.for_sale_by_owner}</li>
            <li>hash:{item.hash}</li>
            <li>MSRP_cents: {item.msrp_cents}</li>
            <li>Rarity_id: {item.rarity_id}</li>
            <li>Subcategory_id: {item.subcategory_id}</li>
            <li>widget_id: {item.widget_id}</li>
            <form>
              <label>Sell price: </label>
              <input></input>
            </form>
            <button>Sell</button>
          </ul>
        </div>
      );
    });
  
  
  return(
    <div>
      <h2>User: {state.userProfile.email}</h2>

      <form onSubmit={onSubmit}>
        <label htmlFor="nameInput">Collection Name: </label>
        <input type="text" className="form-control" id="nameInput" onChange={setCollectionName} value={state.collectionName}/>
        <br></br>
        <label htmlFor="descInput">Collection Description: </label>
        <input type="text" className="form-control" id="descInput" onChange={setCollectionDesc} value={state.collectionDesc}/>

        <h3>Widgets</h3>
        <ul>
          <li>Widget1 []</li>
          <li>Widget2 []</li>
          <li>...</li>
        </ul>
      
        <button type="submit" className="submit">Submit</button>
    </form>

      <h3>Collections:</h3>
      {displayCollections}
      {(!displayCollections || displayCollections.length === 0) && <h4>User does not have any collections yet</h4>}
    </div>
  );

}