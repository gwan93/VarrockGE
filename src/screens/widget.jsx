import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../AuthProvider";

export default function Widget(props) {
  const { state, setState } = useContext(authContext);
  const { widgetID } = useParams();
  const [ widget, setWidget ] = useState({
    details: {},
    history: []
  })

  // Axios request using widgetID from params to get
  // widget details and widget history
  useEffect(() => {
    axios.get(`/widgets/${widgetID}`)
    .then(all => {
      const [ detailsResponse, historyResponse ] = all.data;
      // Order the history objects by id (oldest first, newest last)
      const sortedResponseData = historyResponse.sort((a, b) => a.id - b.id);
      setWidget(prev => ({
        ...prev, 
        details: detailsResponse,
        history: sortedResponseData
      }))
    });
  }, [widgetID]);

  const addToCart = () => {
    // Add this widget's id to state.itemsInCart
    const currentCart = [...state.itemsInCart];
    currentCart.push(widget.details.id);
    setState((prev) => ({
      ...prev,
      itemsInCart: currentCart,
    }));
  };

  const displayWidgetHistory = widget.history.map(historyData => {
    return (
      <ul key={historyData.id}>
        <li>Date Purchased: {`${new Date(historyData.date_purchased.toString())}`}</li>
        <li>By: {historyData.email} (userID: {historyData.id})</li>
        <li>Bought For: ${historyData.bought_for_price_cents / 100}</li>
      </ul>
    );
  });

  return (
    <div>
      <h3>Widget ID is #{widgetID}</h3>
      <ul>
        <li>Name: {widget.details.name}</li>
        <li>imgurl: {widget.details.imgurl}</li>
        <li>Description: {widget.details.description}</li>
        <li>id: {widget.details.id}</li>
        <li>hash: {widget.details.hash}</li>
        <li>MSRP: {widget.details.msrp_cents}</li>
        <li>Rarity_id:{widget.details.rarity_id}</li>
        <li>Subcategory_id: {widget.details.subcategory_id}</li>
        <li>For_sale_by_owner: {widget.details.for_sale_by_owner}</li>
        <li>Current_sell_price_cents: {widget.details.current_sell_price_cents}</li>
      </ul>

      <button onClick={addToCart}>Add to Cart</button>

      <div>
        <h3>History</h3>
          {displayWidgetHistory}
      </div>
    </div>
  );
}
