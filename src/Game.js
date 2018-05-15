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
            started: false,
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
        setTimeout(() => {
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
        },1000);
    }

    checkHighScore() {

        this.highScoreRef.once('value').then((snapshot) => {
            let obj = snapshot.val();
            let newArray = [];
            let foundUser = false;
            console.log(obj);

            for(let index in obj) {
                newArray.push(obj[index]);
            }

            newArray.sort((a, b) => {
                return a.score - b.score
            })

            console.log(newArray);

            for(let i in obj) {
                if(obj[i].name === this.gameProfile.username && this.state.points === obj[i].score) {
                    foundUser = true;
                }
            }
            
            if(!foundUser) {
                this.highScoreRef.push({
                    name: this.gameProfile.username,
                    score: this.state.points
                });
            }
        })
    }

    componentDidMount() {
        this.initializeGame();
        console.log(this.state.gameProfile);
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

        const style = {
            color: "green",
            backgroundcolor: "white"
        }

        let buttonList = this.state.currentOptions.map(function (option, index) {
            if(option.correct) {
                return <button onClick={buttonInput} style={style} key={index} value={option.correct}>{option.text}</button>
            }
            return <button onClick={buttonInput} key={index} value={option.correct}>{option.text}</button>
        })

        if(!this.state.started) {
            <button onClick={this.generateQuestion}>Start</button>
        }

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