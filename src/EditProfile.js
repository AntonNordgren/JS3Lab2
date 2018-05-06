import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';

class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="EditProfile">
                {this.state.text}
            </div>
        );
    }
}

export default EditProfile;