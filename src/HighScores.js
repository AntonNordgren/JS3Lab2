import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';

class HighScores extends Component {
    constructor(props) {
        super(props);

        //this.databaseRef = firebase.database().ref("Quiz").child("highscores/geography");

        this.state = {
            text: this.props.text,
            highScores: [],
            databaseRef: firebase.database().ref("Quiz").child("highscores/geography")
        }
    }

    componentDidMount() {
        console.log("Highscores mounted!");
        this.state.databaseRef.once('value', function(snapshot) {
            let newObj = snapshot.val();
            let newArray = [];
        })
    }

    testFunction() {
        
    }

    render() {

        /*
        let list = this.state.databaseRef.map(function(index) {
            return <div>{index}</div>
        });
        */

        let list = "Hej";

        let comp =  <div>
                        <ul>
                            {list}
                        </ul>
                    </div>

        return (
            <div className="HighScores">
                {comp}
            </div>
        );
    }
}

export default HighScores;