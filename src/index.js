import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCDLa9_ugEAdHo0h05TR5Lj8p0957_N9LY",
    authDomain: "quizgame-2b2f5.firebaseapp.com",
    databaseURL: "https://quizgame-2b2f5.firebaseio.com",
    projectId: "quizgame-2b2f5",
    storageBucket: "quizgame-2b2f5.appspot.com",
    messagingSenderId: "548416376740"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
