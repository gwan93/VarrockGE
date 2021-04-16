import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function User() {
  const userID = useParams().id;
  const [userProfile, setUserProfile] = useState({});

  // Retrieve collections from user
  // update userProfile to an object that includes the user's email,
  // user id, and a collection array
  useEffect(() => {
    Promise.all([
      axios.get(`/user/${userID}`),
      axios.get(`/user/${userID}/collections`),
    ]).then((all) => {
      const [userResponse, collectionsResponse] = all;
      setUserProfile((prev) => ({
        ...prev,
        id: userResponse.data.id,
        email: userResponse.data.email,
      }));
      const collectionPromises = collectionsResponse.data.map(
        (aCollectionData) =>
          axios.get(`/user/1/collections/${aCollectionData.id}`)
      );
      Promise.all(collectionPromises).then((collectionPromisesResults) => {
        const stateCollections = [];
        for (const collectionPromiseResult of collectionPromisesResults) {
          if (collectionPromiseResult.data.length !== 0) {
            const collection = {
              collectionName: collectionPromiseResult.data[0].list_name,
              collectionDescription:
                collectionPromiseResult.data[0].list_description,
              widgets: collectionPromiseResult.data,
            };
            stateCollections.push(collection);
          }
        }
        setUserProfile((prev) => ({
          ...prev,
          collections: stateCollections,
        }));
      });
    });
  }, [userID]);

  let displayCollections;
  if (userProfile.collections) {
    displayCollections = userProfile.collections.map((collection) => {
      const collectionWidgets = collection.widgets.map((widget) => {
        return (
          <div>
            <ul>
              <li>Name: {widget.name}</li>
              <li>
                Current_sell_price_cents: {widget.current_sell_price_cents}
              </li>
              <li>Description: {widget.description}</li>
              <li>For_sale_by_owner: {widget.for_sale_by_owner}</li>
              <li>hash:{widget.hash}</li>
              <li>MSRP_cents: {widget.msrp_cents}</li>
              <li>Rarity_id: {widget.rarity_id}</li>
              <li>Subcategory_id: {widget.subcategory_id}</li>
              <li>widget_id: {widget.widget_id}</li>
            </ul>
          </div>
        );
      });

      return (
        <div>
          <h2>{collection.collectionName}</h2>
          <h2>{collectionWidgets}</h2>
        </div>
      );
    });
  }

  return (
    <div>
      <h2>User: {userProfile.email}</h2>
      <h3>Collections:</h3>
      {displayCollections}
      {(!displayCollections || displayCollections.length === 0) && (
        <h4>User does not have any collections yet</h4>
      )}
    </div>
  );
}
