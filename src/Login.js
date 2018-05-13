import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        }
    }

    login = event => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            var token = result.credential.accessToken;
            var user = result.user;

            this.setState({
                user: user
            });

            this.props.checkUser(this.state.user);
            
        }).catch(function(error) {
            /*
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential
            */
        });
    }

    render() {
        return (
            <div className="Login">
                <button className="loginButton" onClick={this.login}>Login</button>
            </div>
        );
    }
}

export default Login;