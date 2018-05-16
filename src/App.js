import React, { Component } from 'react';
import './App.css';

import QuizGame from './QuizGame.js';
import Login from './Login.js';

import firebase from 'firebase';

class App extends Component {
    constructor(props) {
        super(props);

        this.databaseRef = firebase.database().ref('Quiz').child('users');

        this.state = {
            user: undefined,
            gameProfile: {
                username: ""
            }
        }

    }

    initializeUser = (user) => {
        this.setState({
            user: user
        })
        console.log(this.state.user);
        this.databaseRef.once('value', (snapshot) => {
            let obj = snapshot.val();
            let foundUser = false;

            function createUser() {

                let userName = "newUser";
                let uid = this.state.user.providerData[0].uid;


                this.databaseRef.push({
                    username: userName,
                    id: uid
                });
            }

            for (let index in obj) {
                if (obj[index].id === this.state.user.providerData[0].uid) {
                    foundUser = true;
                }
            }

            if (!foundUser) {

                let userName = "newUser";
                let uid = this.state.user.providerData[0].uid;

                this.createUser(uid);
                console.log("User created!");
                this.setState({
                    gameProfile: {
                        userName: userName,
                        id: uid
                    }
                });
            }
            else {
                console.log("User found!");
                console.log(this.state.gameProfile);
                console.log(obj);
                for(let index in obj) {
                    if(obj[index].id === this.state.user.providerData[0].uid) {
                        this.setState({
                            gameProfile: {
                                username: obj[index].username,
                                id: obj[index].id
                            }
                        });
                    }
                }
            }

        })
    }

    searchUserInDatabase = (uid) => {

        this.databaseRef.once('value', (snapshot) => {
            let obj = snapshot.val();
            let foundUser = false;

            function createUser() {
                
                this.databaseRef.push({
                    username: "newUser1",
                    id: uid
                });
            }

            for (let index in obj) {
                if (obj[index].id === uid) {
                    foundUser = true;
                }
            }

            if (!foundUser) {
                this.createUser(uid);
                console.log("User created!");
            }

        })
    }

    createUser = (uid) => {
        console.log("Create User Called!");
        console.log(firebase.database().ref('Quiz').child('users'));

        this.databaseRef.push({
            username: "newUser",
            id: uid
        });
    }

    checkUser = event => {
        console.log(this.state.gameProfile);
    }

    render() {

        let comp;
        if (!this.state.user) {
            comp = <Login checkUser={this.initializeUser} />
        }
        else {
            comp = <div>
                <QuizGame user={this.state.user} gameProfile={this.state.gameProfile} />
            </div>
        }

        return (
            <div className="App">
                {comp}
            </div>
        );
    }
}

export default App;
