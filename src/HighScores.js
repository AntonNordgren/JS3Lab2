import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';

class HighScores extends Component {
    constructor(props) {
        super(props);

        //this.databaseRef = firebase.database().ref("Quiz").child("highscores/" + this.state.type);

        this.state = {
            text: this.props.text,
            highScores: [],
            type: "geography"
        }
    }

    componentDidMount() {
        this.getHighScore();
    }

    getHighScore() {
        console.log(this.state.type);
        firebase.database().ref('Quiz').child('highscores/' + this.state.type).once('value').then((snapshot) => {
            console.log(snapshot.val());
            let obj = snapshot.val();
            let newArray = [];

            for(let index in obj) {
                newArray.push(obj[index]);
            }
            this.setState({
                highScores: newArray
            });
        })
    }

    handleHighScoreCategory = event => {
        console.log(event.target.value);

        let type = "";

        if(event.target.value == 1) {
            console.log("event.target: " + event.target.value);
            this.setState({
                type: "geography"
            });
        }
        else if (event.target.value == 2) {
            this.setState({
                type: "videogames"
            });
        }
        else if (event.target.value == 3) {
            this.setState({
                type: "history"
            });
        }
        this.getHighScore();
    }

    render() {

        let highScoreList = this.state.highScores.map((option, index) => {
            let result =
            <li key={index}>
                <div>
                    {option.name + " " + option.score}
                </div>
            </li>
            return result;
        })

        let comp =  <div>
                        <ul>
                            {highScoreList}
                        </ul>
                    </div>

        return (
            <div className="HighScores">
                {comp}
                <div className="highScoreButtons">
                    <button onClick={this.handleHighScoreCategory} value={1}>Geography</button>
                    <button onClick={this.handleHighScoreCategory} value={2}>Video Games</button>
                    <button onClick={this.handleHighScoreCategory} value={3}>History</button>
                </div>
            </div>
        );
    }
}

export default HighScores;