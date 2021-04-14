import axios from 'axios';
import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';


export default function Widget(){
  const {widgetID} = useParams();

  // useEffect(() => {
  //   axios.get(`/widget/${widgetID}`)
  //   .then(response => {
  //     console.log('response from axios get is', response)
  //   })
  // }, [widgetID]);
  
  return(
    <h3>Widget ID is #{widgetID}</h3>
  )
}