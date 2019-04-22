import React from 'react'
import * as firebase from 'firebase'
import { Typography, Paper } from '@material-ui/core';
import './index.css'

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
                { 
                    this.state.question !== null &&
                    !this.props.questionLoading &&
                    <Paper className='paper'>
                        { this.state.question.question }
                    </Paper>
                }
                {
                    this.props.questionLoading &&
                    <Typography variant='body1'>Loading question...</Typography>
                }
            </div>
        )
    }
}