import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './AuthProvider';
require('dotenv').config({path: './.env'});
console.log(process.env.REACT_APP_API_URL)


ReactDOM.render(
  
  <AuthProvider>
      <App />
  </AuthProvider>,

 
  document.getElementById('root')
);

