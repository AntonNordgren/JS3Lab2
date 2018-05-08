import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeOfQuiz: this.props.type,
            points: 0,
            currentQuestion: "",
            currentOptions: [],
            firebaseQuestions: [],
            testGame: [
                {
                    question: "What is the biggest country in the world by area?",
                    options: [
                        {text: "USA", correct: false},
                        {text: "Russia", correct: true},
                        {text: "Canada", correct: false},
                        {text: "China", correct: false}
                    ]
                },
                {
                    question: "What is the capital of Sweden",
                    options: [
                        {text: "Malmö", correct: false},
                        {text: "Gothenburg", correct: false},
                        {text: "Stockholm", correct: true},
                        {text: "Uppsala", correct: false}
                    ]
                },
                {
                    question: "Which is the most populated city in the world",
                    options: [
                        {text: "Tokyo", correct: true},
                        {text: "Shanghai", correct: false},
                        {text: "Beijing", correct: false},
                        {text: "Karachi", correct: false}
                    ]
                }
            ]
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
        let questionNr = Math.ceil(Math.random() * (this.state.testGame.length)-1);
        let newQuestion = this.state.testGame[questionNr].question;

        let options = this.shuffle([this.state.testGame[questionNr].options[0],
                                    this.state.testGame[questionNr].options[1],
                                    this.state.testGame[questionNr].options[2],
                                    this.state.testGame[questionNr].options[3]]);

        this.setState({
            currentQuestion: newQuestion,
            currentOptions: options
        });
    }

    generateQuestionArray() {
        let newArray = [];
        for(let i = 0; i < this.state.testGame.length; i++) {
            newArray.push(this.state.testGame[Math.ceil(Math.random() * this.state.testGame.length) - 1]);
        }
        console.log(newArray);
    }
    
    componentWillMount() {
        this.generateQuestion();
        this.generateQuestionArray();
    }

    handleCurrentQuestion = event => {
        this.generateQuestionArray();
        if(event.target.value === "true_") {
            this.setState({
                points: this.state.points + 1
            });
        }

        this.generateQuestion();
    }

    
    render() {

        let comp =  <div>
                        <div className="questionText">{this.state.currentQuestion}</div>
                        <div className="gameButtonDiv">
                            <button onClick={this.handleCurrentQuestion} value={this.state.currentOptions[0].correct}>{this.state.currentOptions[0].text}</button>
                            <button onClick={this.handleCurrentQuestion} value={this.state.currentOptions[1].correct}>{this.state.currentOptions[1].text}</button>
                            <button onClick={this.handleCurrentQuestion} value={this.state.currentOptions[2].correct}>{this.state.currentOptions[2].text}</button>
                            <button onClick={this.handleCurrentQuestion} value={this.state.currentOptions[3].correct}>{this.state.currentOptions[3].text}</button>
                        </div>
                    </div>;

        return (
            <div className="Game">
                {comp}
                {this.state.points}
            </div>
        );
    }
}

export default Game;