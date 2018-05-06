import React, { Component } from 'react';
import './App.css';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeOfQuiz: this.props.type
        }
    }

    render() {
        return (
            <div className="Game">
                {this.state.typeOfQuiz}
            </div>
        );
    }
}

export default Game;