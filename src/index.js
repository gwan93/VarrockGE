import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './AuthProvider';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  
  <AuthProvider>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </AuthProvider>,

 
  document.getElementById('root')
);

