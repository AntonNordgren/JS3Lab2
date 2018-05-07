import React, { Component } from 'react';
import './App.css';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeOfQuiz: this.props.type,
            points: 0,
            currentQuestion: {},
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

    generateQuestion() {
        let questionNr = Math.ceil(Math.random() * (this.state.testGame.length)-1);

        let newQuestion = {
            question: this.state.testGame[questionNr].question,
            options: this.state.testGame[questionNr].options
        }
        console.log(newQuestion);
        this.setState({
            currentQuestion: newQuestion
        });
        console.log(this.state.currentQuestion);
        console.log(this.state.currentQuestion.options[].length);
    }

    componentWillMount() {
        this.generateQuestion();
    }

    
    render() {

        let buttons = this.state.currentQuestion.options.map(
            <button>Hej</button>
        );

        let comp =  <div>
                        <div className="questionText">{}</div>
                        <div className="gameButtonDiv">
                            {buttons}
                        </div>
                    </div>;

        return (
            <div className="Game">
                {comp}
            </div>
        );
    }
}

export default Game;