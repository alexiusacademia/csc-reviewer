import React from 'react'
import { Typography, Paper } from '@material-ui/core';
import './index.css'

export default class Question extends React.Component {
    state = {
        question: {}
    }

    componentWillReceiveProps() {
        
    }

    render() {
        return (
            <div>
                { 
                    this.state.question !== null &&
                    !this.props.questionLoading &&
                    <Paper className='paper'>
                        <Typography variant='subheading'>
                            { this.props.question.question }
                        </Typography>
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