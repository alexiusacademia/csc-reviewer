import React from 'react'
import * as firebase from 'firebase'
import { Typography } from '@material-ui/core';

export default class Question extends React.Component {
    state = {
        question: {}
    }

    componentWillReceiveProps() {
        this.setState({
            question: this.props.question
        })
    }

    render() {
        return (
            <div>
                { this.state.question !== null &&
                    this.state.question.question
                }
            </div>
        )
    }
}