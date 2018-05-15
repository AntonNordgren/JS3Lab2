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

            console.log(newArray);

            for(let index in obj) {
                newArray.push(obj[index]);
            }
            
            newArray.sort((a, b) => {
                return b.score -a.score
            })

            if(newArray.length > 5) {
                console.log("Array bigger than 5")
                console.log(newArray.slice(0, 5));
                newArray = newArray.slice(0, 5)
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
                    {option.name + " - " + option.score + " points"}
                </div>
            </li>
            return result;
        })
        
        let comp =  <div>
                        {this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1)}
                        <ol>
                            {highScoreList}
                        </ol>
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