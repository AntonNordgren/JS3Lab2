import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';

class HighScores extends Component {
    constructor(props) {
        super(props);

        this.databaseRef = firebase.database().ref('highscores');

        this.state = {
            text: this.props.text,
            highScores: []
        }
    }

    componentDidMount() {
        this.databaseRef.on('value', snap => {
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
            </div>
        );
    }
}

export default HighScores;