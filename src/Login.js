import React, { Component } from 'react';
import './App.css';

//import firebase from 'firebase';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: ""
        }
    }

    login() {
        /*
        const auth = firebase.auth();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;

            console.log(user.displayName);

            if(user.displayName !== "") {
                this.setState({
                    userName: user.displayName
                });
            }


        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential
        });
        */
    }

    render() {
        return (
            <div className="Login">
                <button onClick={this.login}>Login</button>
                loggedin : {this.state.userName}
            </div>
        );
    }
}

export default Login;