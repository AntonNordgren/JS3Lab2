import React, { Component } from 'react';
import './App.css';

import Game from './Game.js';

class GameMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentState: "Menu"
        }
    }

    stateHandler = event => {
        this.setState({
            currentState: event.target.innerText
        });
    }

    render() {
        let comp;
        if(this.state.currentState === "Menu") {
            comp = <div>
                    <button onClick={this.stateHandler}>Geography</button>
                    <button onClick={this.stateHandler}>Video Games</button>
                    <button onClick={this.stateHandler}>Option 3</button>
                   </div>
        }
        else if(this.state.currentState === "Geography") {
            comp = <Game type="geography" />
        }
        else if(this.state.currentState === "Video Games") {
            comp = <Game type="videogames" />
        }
        else if(this.state.currentState === "Option 3") {
            comp = <Game type="food" />
        }

        return (
            <div className="GameMenu">
                {comp}
            </div>
        );
    }
}

export default GameMenu;