import React, { Component } from 'react';
import './App.css';

import QuizGame from './QuizGame.js';
import Login from './Login.js';

import firebase from 'firebase';

class App extends Component {
    constructor(props) {
        super(props);

        this.databaseRef = firebase.database().ref().child("message");

        this.state = {
            loggedIn: true,
        }

    }

    componentDidMount() {
        console.log("Mount");
    }

    componentWillUnmount() {
        console.log("Unmount!");
    }

    render() {

        let comp;
        if(!this.state.loggedIn) {
            comp = <Login />
        }
        else {
            comp = <QuizGame database={this.database} />;
        }

        return (
            <div className="App">
                {comp}
            </div>
        );
    }
}

export default App;
