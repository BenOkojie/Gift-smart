import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6yzn7YRkqevoWQZt_8K9fsPPTI1ws_i4",
  authDomain: "gift-smart-7a3b4.firebaseapp.com",
  projectId: "gift-smart-7a3b4",
  storageBucket: "gift-smart-7a3b4.appspot.com",
  messagingSenderId: "114410318482",
  appId: "1:114410318482:web:105b9660c6e74f778f544b",
  measurementId: "G-7GWENP53GH"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
