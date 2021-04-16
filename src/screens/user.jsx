import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authContext } from '../AuthProvider';

export default function User(){

  const userID = Number(useParams().id);
  const { state } = useContext(authContext);
  const [ userProfile, setUserProfile ] = useState({});
  const [ widgetOwners, setWidgetOwners ] = useState([]);
  
  // Get request to get all widgets
  useEffect(() => {
    axios.get(`/user/${userID}`)
    .then(response => {
      setUserProfile(prev => ({
        ...prev,
        ...response.data
      }));
    })

    axios.get('/widgets/owners')
    .then(response => {
      setWidgetOwners(response.data)
    })
  }, [userID]);

  const usersWidgetsID = [];
  widgetOwners.filter(widget => {
    if (widget.user_id === userID) {
      usersWidgetsID.push(widget.widget_id);
    }
  })

  const usersWidgetsDetails = state.widgets.filter(widget => {
    return usersWidgetsID.includes(widget.id);
  })

  const displayWidgets = usersWidgetsDetails.map(widget => {

    return(
      <li><Link to={`/widgets/${widget.id}`}>{widget.name}</Link></li>
    );
  })

  return(
    <div>
      <h2>Email: {userProfile.email}</h2>
      <h2>Wallet Balance: {userProfile.balance}</h2>
      <h2>Admin Status: {String(userProfile.isadmin)}</h2>
      <Link to={`/user/${userID}/collections`}><h2>View {userProfile.email}'s Collections</h2></Link>
      <h2>{userProfile.email}'s widgets</h2>

      {displayWidgets}

    </div>
  );
}
