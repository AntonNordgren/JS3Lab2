import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';
import { ETIME } from 'constants';

class Game extends Component {
    constructor(props) {
        super(props);

        this.databaseRef = firebase.database().ref('Quiz').child('Category').child(this.props.type);
        this.highScoreRef = firebase.database().ref('Quiz').child('highscores').child(this.props.type);

        this.gameProfile = this.props.gameProfile;

        this.state = {
            points: 0,
            currentQuestion: "",
            currentOptions: [],
            currentIndex: 0,
            game: undefined,
            nrOfQuestions: 10,
            endGame: false,
            sameHighScore: false
        }
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    generateQuestion = event => {
        console.log(this.state.currentIndex);

        console.log(this.gameProfile);

        if (this.state.currentIndex !== this.state.nrOfQuestions) {
            this.setState({
                currentIndex: this.state.currentIndex + 1
            });

            let newArray = [];

            for (let i in this.state.game[this.state.currentIndex].options) {
                newArray.push(this.state.game[this.state.currentIndex].options[i]);
            }

            this.shuffle(newArray);

            this.setState({
                currentQuestion: this.state.game[this.state.currentIndex].description,
                currentOptions: newArray
            });
        }
        else {
            console.log("Endgame");
            this.setState({
                endGame: true
            });

            this.checkHighScore();
        }
    }

    checkHighScore() {
        this.highScoreRef.once('value').then((snapshot) => {
            let obj = snapshot.val();
            let newArray = [];
            console.log(obj);

            for(let index in obj) {
                newArray.push(obj[index]);
            }

            newArray.sort((a, b) => {
                return a.score - b.score
            })

            console.log(newArray);

            for(let i = 0; i < newArray.length; i++) {
                if(this.gameProfile.username === newArray[i].name && this.state.points === newArray[i].score) {
                    console.log("Found someone with the same Score and name!");
                    this.setState({
                        sameHighScore: true
                    });
                }
            }

            
            if(!this.state.sameHighScore) {
                this.highScoreRef.push({
                    name: this.gameProfile.username,
                    score: this.state.points
                });

            }

        })
    }

    componentDidMount() {
        this.initializeGame();
    }

    initializeGame() {

        this.databaseRef.once('value').then((snapshot) => {

            let questionsArray = [];
            let obj = snapshot.val();

            for (let index in obj) {

                let newQuestion = {
                    description: "",
                    options: []
                };

                newQuestion.description = obj[index].description;
                newQuestion.options = obj[index].options;
                questionsArray.push(newQuestion);
            }

            this.shuffle(questionsArray);

            this.setState({
                game: questionsArray
            });
        })
    }

    checkCurrentUser = () => {
        console.log(this.gameProfile);
    }

    render() {
        let comp;
        let buttonInput = event => {
            if (event.target.value === 'true') {
                this.setState({
                    points: this.state.points + 1
                });
            }
            this.generateQuestion();
        }
        let buttonList = this.state.currentOptions.map(function (option, index) {
            return <button onClick={buttonInput} key={index} value={option.correct}>{option.text}</button>
        })
        if(this.state.endGame) {
            comp =
            <div>
                You got {this.state.points} points out of {this.state.nrOfQuestions}
            </div>
        }
        else {
            comp =
            <div>
                <div className="questionText">
                    {this.state.currentQuestion}
                </div>
                <div className="gameButtonDiv">
                    {buttonList}
                </div>
                    <button onClick={this.generateQuestion}>Start</button>
            </div>
        }
        return (
            <div className="Game">
                {comp}
            </div>
        );
    }
}

export default Game;