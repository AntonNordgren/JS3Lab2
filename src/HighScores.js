import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';

class HighScores extends Component {

    constructor(props) {
        super(props);

        this.databaseRef = firebase.database().ref().child('highscores');

        this.state = {
            text: this.props.text,
            highScores: []
        }
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.databaseRef.on('value', snap => {
            let players = snap.val();
            console.log(players);
            for(var player in players) {
                console.log(player);
            }
            this.setState({
            });
        });
    }

    testFunction() {
        
    }

    render() {
        return (
            <div className="HighScores">
                <ul>
                    {this.state.highScores.map((listValue, index) => {
                        return <li key={index}>{listValue}</li>;
                    })}
                </ul>
                <button onClick={this.testFunction}>Test button</button>
            </div>
        );
    }
}

export default HighScores;