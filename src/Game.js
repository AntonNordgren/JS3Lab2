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
            rightAnswer: "",
            showRightAnswer: false
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
        if(this.state.currentIndex !== 0) {
            this.setState({
                showRightAnswer: true
            });
        }
        setTimeout(() => {
            this.setState({
                showRightAnswer: false
            });
            if (this.state.currentIndex !== this.state.nrOfQuestions) {
                this.setState({
                    currentIndex: this.state.currentIndex + 1
                });
    
                let newArray = [];
    
                for (let i in this.state.game[this.state.currentIndex].options) {
                    newArray.push(this.state.game[this.state.currentIndex].options[i]);
                }
    
                this.shuffle(newArray);

                for(let i = 0; i < newArray.length; i++) {
                    if(newArray[i].correct === true) {
                        console.log(newArray[i]);
                        this.setState({
                            rightAnswer: newArray[i].text
                        });
                    }
                }
    
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

    handleStartButton = () => {
        this.setState({
            started: true
        });
        this.generateQuestion();
    }

    playAgain = () => {
        console.log("Play again");
        this.setState({
            points: 0,
            currentQuestion: "",
            currentOptions: [],
            currentIndex: 0,
            game: undefined,
            nrOfQuestions: 10,
            endGame: false,
            started: false,
            rightAnswer: "",
            showRightAnswer: false
        });
        this.initializeGame();
    }

    render() {
        let comp;
        let start;
        let showStart;
        let rightAnswerDiv;

        if(this.state.showRightAnswer) {
            rightAnswerDiv = <div>
                                The right answer was {this.state.rightAnswer}
                            </div>
        }
        else {
            rightAnswerDiv = <div></div>
        }

        if(!this.state.started) {
            start = 
           <div>
               <button onClick={this.handleStartButton}>Start</button>
            </div>
        }
        else {
            start = <div></div>
        }

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
            return <button onClick={buttonInput} key={index} value={option.correct}>{option.text}</button>
        })

        if(!this.state.started) {
            <button onClick={this.generateQuestion}>Start</button>
        }

        if(this.state.endGame) {
            comp =
            <div>
                You got {this.state.points} points out of {this.state.nrOfQuestions}
                <button onClick={this.playAgain}>Play Again</button>
            </div>
        }
        else {
            comp =
            <div>
                <div>
                    Points: {this.state.points}
                </div>
                <div>
                    Question {this.state.currentIndex} of {this.state.nrOfQuestions}
                </div>
                {rightAnswerDiv}
                <div className="questionText">
                    {this.state.currentQuestion}
                </div>
                <div className="gameButtonDiv">
                    {buttonList}
                </div>
                {start}
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