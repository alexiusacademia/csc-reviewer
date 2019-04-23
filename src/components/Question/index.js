import React from 'react'
import * as firebase from 'firebase'
import { Typography, Paper, Grid, Button } from '@material-ui/core';
import './index.css'

export default class Question extends React.Component {
    
    state = {
        choices: [],
        questionLoading: false,
        showNextQuestionButton: false
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

    handleChoiceClick = (evt, answer) => {
        if (answer === this.props.correctAnswer) {
            evt.target.classList.add("correct")
        } else {
            evt.target.classList.add("wrong")
        }

        // Show Next button
        document.getElementById('btnNextQuestion').setAttribute('style',
            'visibility: visible; display: block;')

    }

    handleNextQuestionClick = (evt) => {
        this.setState({

        })
        var q = []
        firebase.firestore()
            .collection('questions')
            .where("category", "==", parseInt(this.props.category))
            .get()
            .then((result) => {
                result.forEach((doc) => {
                    q.push(doc.data())
                })

                const index = Math.floor(Math.random() * q.length)

                this.setState({
                    question: q[index],
                    correctAnswer: q[index].choices[0]
                })

                this.setState({
                    questionLoading: false,
                    showNextQuestionButton: false
                })
            })
    }

    render() {
        return (
            <div>
                { 
                    !this.props.questionLoading && !this.state.questionLoading &&
                    <Paper className='paper'>
                        <Typography variant='subheading' className='question'>
                            { this.props.question.question }
                        </Typography>
                        <Grid container spacing={16}>
                            { this.shuffle(this.props.question.choices).map(choice => 
                                <Grid item xs={12} sm={6} key={choice} 
                                onClick={evt => this.handleChoiceClick(evt, choice)}>
                                    <div className='choice MuiPaper-root-10 MuiPaper-elevation2-14'>{choice}</div>
                        
                                </Grid>
                            ) }

                            
                                <Button id="btnNextQuestion" 
                                    xs={12} 
                                    sm={6} 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={this.handleNextQuestionClick}>
                                    Next Question
                                </Button>
                                
                            
                        </Grid>
                    </Paper>
                }
                
                {
                    (this.props.questionLoading || this.state.loadingQuestion)
                    &&
                    <Typography variant='body1'>Loading question...</Typography>
                }
                
            </div>
        )
    }
}