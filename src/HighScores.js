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
        this.getHighScore("geography");
    }

    getHighScore(para) {
            console.log(this.state.type);
            firebase.database().ref('Quiz').child('highscores/' + para).once('value').then((snapshot) => {
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
                    newArray = newArray.slice(0, 5)
                }
    
                this.setState({
                    highScores: newArray
                });
            });
    }

    handleHighScoreCategory = event => {
        let para = "";

        if(event.target.value == 1) {
            para = "geography";
        }
        else if (event.target.value == 2) {
            para = "videogames";
        }
        else if (event.target.value == 3) {
            para = "history";
        }
        this.getHighScore(para);
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
        
        let comp =  <div className='HighscoreList'>
                        <span>{this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1)}</span>
                        <ol>
                            {highScoreList}
                        </ol>
                    </div>

        return (
            <div className="HighScores">
                
                <div className="highScoreButtons">
                    <button onClick={this.handleHighScoreCategory} value={1}>Geography</button>
                    <button onClick={this.handleHighScoreCategory} value={2}>Video Games</button>
                    <button onClick={this.handleHighScoreCategory} value={3}>History</button>
                </div>
                {comp}
            </div>
        );
    }
}

export default HighScores;