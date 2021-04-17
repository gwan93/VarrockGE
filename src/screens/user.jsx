import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authContext } from '../AuthProvider';

export default function User(){

  const userID = Number(useParams().id);
  const { state } = useContext(authContext);
  const [ userProfile, setUserProfile ] = useState({
    id: null,
    email: "",
    balance: null,
    isadmin: null,
    password: "",
    userWidgets: []
  });

  console.log('userProfile', userProfile)
  
  useEffect(() => {
    Promise.all([
      axios.get(`/user/${userID}`),
      axios.get('/widgets/owners')
    ])
    .then(all => {
      const [ userResponse, widgetOwnersResponse ] = all;

      console.log('widgetOwnersResponse.data', widgetOwnersResponse.data)

      // Filtering the array of widget owners to only include widgets 
      // owned by the user of the profile being visited
      // Note: these elements do not have the widget's name, description, etc...
      const ownedWidgets = widgetOwnersResponse.data.filter(widgetOwner => {
        return widgetOwner.user_id === userID;
      });

      console.log('ownedWidgets', ownedWidgets)

      // Create array that consists of this user's owned widgets' IDs
      const ownedWidgetsID = [];
      for (const ownedWidget of ownedWidgets) {
        ownedWidgetsID.push(ownedWidget.widget_id);
      };

      console.log('ownedWidgetsID', ownedWidgetsID)

      // Filter all existing widgets stored in state based on the above created array
      // ie if ownedWidgets = [1, 2, 3], then make an array with the details of widgets 1, 2, 3
      const ownedWidgetsDetails = state.widgets.filter(widget => {
        // console.log('widget', widget)
        return ownedWidgetsID.includes(widget.id)
      });

      console.log('ownedWidgetsDetails', ownedWidgetsDetails)

      setUserProfile(prev => ({
        ...prev,
        ...userResponse.data,
        userWidgets: ownedWidgetsDetails
      }));

    })
  }, [userID, state.widgets]);

  const displayWidgets = userProfile.userWidgets.map(widget => {
    return(
      <li><Link to={`/widgets/${widget.id}`}>{widget.name} {widget.id}</Link></li>
    );
  });

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
};
