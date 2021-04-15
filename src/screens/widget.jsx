import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';


export default function Widget(props){
  const {widgetID} = useParams();

  // Set local widget state
  const [widget, setWidget] = useState({});  

  // Axios request using widgetID from params to get 
  // widget details, then setWidget to the returned data
  useEffect(() => {
    axios.get(`/widgets/${widgetID}`)
    .then(response => {
      console.log(response.data)
      setWidget(response.data)
    })
  }, [widgetID]);

  return(
    <div>
      <h3>Widget ID is #{widgetID}</h3>
      <ul>
        <li>Name: {widget.name}</li>
        <li>Description: {widget.description}</li>
        <li>id: {widget.id}</li>
        <li>hash: {widget.hash}</li>
        <li>MSRP: {widget.msrp_cents}</li>
        <li>Rarity_id:{widget.rarity_id}</li>
        <li>Subcategory_id: {widget.subcategory_id}</li>
        <li>For_sale_by_owner: {widget.for_sale_by_owner}</li>
        <li>Current_sell_price_cents: {widget.current_sell_price_cents}</li>
      </ul>
    </div>
  )
}