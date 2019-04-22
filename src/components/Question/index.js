import React from 'react'
import { Typography, Paper, Grid } from '@material-ui/core';
import './index.css'

export default class Question extends React.Component {
    
    state = {
        choices: []
    }

    shuffle = function (array) {

        var currentIndex = array.length
        var temporaryValue, randomIndex
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
    
        return array;
    
    }

    componentDidUpdate() {
        
    }

    render() {
        return (
            <div>
                { 
                    !this.props.questionLoading &&
                    <Paper className='paper'>
                        <Typography variant='subheading' className='question'>
                            { this.props.question.question }
                        </Typography>
                        <Grid container spacing={16}>
                            { this.shuffle(this.props.question.choices).map(choice => 
                                <Grid item xs={12} sm={6} key={choice}>
                                    <Paper className='choice'>
                                        <Typography>
                                            {choice}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ) }
                        </Grid>
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