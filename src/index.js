import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDxObJLxZ81LFJx_ITnaHq25YWo6aFm2Gc",
    authDomain: "quizlabben-481c1.firebaseapp.com",
    databaseURL: "https://quizlabben-481c1.firebaseio.com",
    projectId: "quizlabben-481c1",
    storageBucket: "quizlabben-481c1.appspot.com",
    messagingSenderId: "38183108167"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
