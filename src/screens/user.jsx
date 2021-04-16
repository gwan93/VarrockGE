import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function User(){

  const userID = useParams().id;
  const [ userProfile, setUserProfile ] = useState({});
  
  // Get request to get all widgets
  useEffect(() => {
    axios.get(`/user/${userID}`)
    .then(response => {
      console.log(response.data);
      setUserProfile(prev => ({
        ...prev,
        ...response.data
      }));
    })
  }, [userID]);

  return(
    <div>
      <h2>Email: {userProfile.email}</h2>
      <h2>Wallet Balance: {userProfile.balance}</h2>
      <h2>Admin Status: {String(userProfile.isadmin)}</h2>
      <Link to={`/user/${userID}/collections`}><h2>View {userProfile.email}'s Collections</h2></Link>
      <h2>These are my widgets</h2>
      <h3>Link to /widget/1 Widget 1</h3>
      <h3>Link to /widget/2 Widget 2</h3>
    </div>
  );
}
