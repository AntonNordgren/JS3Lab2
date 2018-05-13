import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';

class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.databaseRef = firebase.database().ref('Quiz').child('users');

        this.state = {
            user: this.props.user,
            gameProfile: this.props.gameProfile,
            inputText: ""
        }
    }

    componentDidMount() {
        console.log("Edit Profile Mounted!");
        console.log(this.state.gameProfile.username);
    }

    onChange = event => {
        this.setState({
            inputText: event.target.value
        });
        console.log(this.state.inputText);
    }

    changeUserName = event => {

        this.databaseRef.once('value', (snapshot) => {

            let obj = snapshot.val();
            let found = false;

            console.log(this.state.gameProfile);

            for(let key in obj) {
                if(obj[key].id === this.state.gameProfile.id) {
                    firebase.database().ref('Quiz').child('users/' + key).set({
                        username: this.state.inputText,
                        id: obj[key].id
                    });
                }
            }
        })

    }

    render() {
        return (
            <div className="EditProfile">
                You are logged in as: {this.state.gameProfile.username}

                <div>
                    <input type="text" placeholder="Enter username here" onChange={this.onChange}/>
                    <button onClick={this.changeUserName}>Change UserName</button>
                </div>
            </div>
        );
    }
}

export default EditProfile;