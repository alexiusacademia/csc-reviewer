import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'
import {BrowserRouter} from 'react-router-dom'

var config = {
    apiKey: "AIzaSyBHykkvr4dQmN01xTHGro8UYY6YRuu_6sI",
    authDomain: "syncsoftsolutions-csc-reviewer.firebaseapp.com",
    databaseURL: "https://syncsoftsolutions-csc-reviewer.firebaseio.com",
    projectId: "syncsoftsolutions-csc-reviewer",
    storageBucket: "syncsoftsolutions-csc-reviewer.appspot.com",
    messagingSenderId: "918369854182"
  };
  
firebase.initializeApp(config)

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
