import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authContext } from '../AuthProvider';

export default function Collection(){
  
  const userID = useParams().id;
  const { collectionID } = useParams();
  const { state } = useContext(authContext);
  const [ collection, setCollection ] = useState({
    userProfile: {},
    collectionName: "",
    collectionDesc: "",
    collectionItems: []
  });

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

  // const setCollectionItems = (event) => {
  //   console.log('setCollectionItems');
  // };

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
      if (collectionResponse.data[0]) {
        setCollection(prev => ({
          ...prev,
          userProfile: userResponse.data,
          collectionName: collectionResponse.data[0].list_name,
          collectionDesc: collectionResponse.data[0].list_description,
          collectionItems: collectionResponse.data
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

  const usersWidgetsDetails = state.widgets.filter(widget => {
    return state.myWidgets.includes(widget.id);
  })

  const displayWidgets = usersWidgetsDetails.map(widget => {
    // console.log(widget);
    return(
      <p>
        <input type="checkbox" name={`${widget.name}`}></input>
        <label htmlFor={`${widget.name}`}>{widget.name}</label>
      </p>
    );
  })

  let displayCollections = [];
  if (collection.collectionItems.length !== 0) {
    displayCollections = collection.collectionItems.map(item => {
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
  }
  // console.log('displayCollections', displayCollections)
  
  return(
    <div>
      <h2>User: {collection.userProfile.email}</h2>

      <form onSubmit={onSubmit}>
        <label htmlFor="nameInput">Collection Name: </label>
        <input type="text" className="form-control" id="nameInput" onChange={setCollectionName} value={collection.collectionName}/>
        <br></br>
        <label htmlFor="descInput">Collection Description: </label>
        <input type="text" className="form-control" id="descInput" onChange={setCollectionDesc} value={collection.collectionDesc}/>

        <h3>Select widget(s) below to add to this collection</h3>
        <ul>
          {displayWidgets}
        </ul>
        <button type="submit" className="submit">Submit</button>
      </form>

      <h3>Widgets:</h3>
      {displayCollections}
      {(!displayCollections || displayCollections.length === 0) && <h4>This collection does not have any widgets yet</h4>}
    </div>
  );
}