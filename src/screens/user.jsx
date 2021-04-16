import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';

export default function User(){

  const userID = useParams().id;

  // Get request to get all widgets

  return(
    <div>
      <h2>Email: -show email here-</h2>
      <Link to={`/user/${userID}/collections`}><h2>View My Collections</h2></Link>
      <h2>These are my widgets</h2>
      <h3>Link to /widget/1 Widget 1</h3>
      <h3>Link to /widget/2 Widget 2</h3>
    </div>
  );
}