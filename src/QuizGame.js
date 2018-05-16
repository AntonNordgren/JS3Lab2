import React, { Component } from 'react';
import './App.css';

import GameMenu from './GameMenu.js';
import HighScores from './HighScores.js';
import EditProfile from './EditProfile.js';

class QuizGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentState: "Menu",
            user: this.props.user
        }
    }

    componentWillMount() {
        console.log(this.props.user);
    }

    handleCurrentState = event => {
        this.setState({
            currentState: event.target.innerText
        });
    }

    render() {
        let state;
        if(this.state.currentState === "Menu") {
            state = <div className="QuizGameMenu">
                        <button onClick={this.handleCurrentState}>Play</button>
                        <button onClick={this.handleCurrentState}>High Scores</button>
                        <button onClick={this.handleCurrentState}>Edit Profile</button>
                    </div>
        }
        else if(this.state.currentState === "Play") {
            state = <div className="QuizGameMenu">
                        <GameMenu gameProfile={this.props.gameProfile}/>
                        <button className="menuButton" onClick={this.handleCurrentState}>Menu</button>
                    </div>
        }
        else if(this.state.currentState === "High Scores") {
            state = <div className="QuizGameMenu">
                        <HighScores text={"You're in HighScores"}/>
                        <button className="menuButton" onClick={this.handleCurrentState}>Menu</button>
                    </div>
        }
        else if(this.state.currentState === "Edit Profile") {
            state = <div className="QuizGameMenu">
                        <EditProfile user={this.state.user} gameProfile={this.props.gameProfile} text={"You're in Edit Profile"} />
                        <button className="menuButton" onClick={this.handleCurrentState}>Menu</button>
                    </div>
        }

        return (
            <div className="QuizGame">
                {state}
            </div>
        );
    }
}

export default QuizGame;