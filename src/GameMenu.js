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
                    <button onClick={this.stateHandler}>History</button>
                   </div>
        }
        else if(this.state.currentState === "Geography") {
            comp = <Game type="geography" gameProfile={this.props.gameProfile} />
        }
        else if(this.state.currentState === "Video Games") {
            comp = <Game type="videogames" gameProfile={this.props.gameProfile} />
        }
        else if(this.state.currentState === "History") {
            comp = <Game type="history" gameProfile={this.props.gameProfile} />
        }

        return (
            <div className="GameMenu">
                {comp}
            </div>
        );
    }
}

export default GameMenu;