import React, { Fragment } from 'react'
import * as firebase from 'firebase'
import { Typography, Paper, Grid, Button, LinearProgress } from '@material-ui/core';
import './index.css'

export default class Question extends React.Component {
    state = {
        choices: [],
        questionLoading: true,
        showNextQuestionButton: false,
        category: null,
        question: {},
        correctAnswer: ''
    }
    
    componentWillMount() {
        this.setState({
            category: this.props.category
        })
        this.getQuestion(this.props.category)
    }

    componentWillReceiveProps(props) {
        this.setState({
            category: props.category
        })
        this.getQuestion(props.category)
    }

    getQuestion = (cat) => {
        this.setState({
            questionLoading: true
        })
        var q = []

        const db = firebase.firestore()

        db.collection('questions')
            .where("category", "==", parseInt(cat))
            .get()
            .then((result) => {
                result.forEach((doc) => {
                    q.push(doc.data())
                })

                const index = Math.floor(Math.random() * q.length)

                this.setState({
                    question: q[index],
                    correctAnswer: q[index].choices[0],
                    questionLoading: false
                })
            })
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
        if (answer === this.state.correctAnswer) {
            evt.target.classList.add("correct")
        } else {
            evt.target.classList.add("wrong")
        }

        // Show Next button
        document.getElementById('btnNextQuestion').setAttribute('style',
            'visibility: visible; display: block;')

        // Show answer
        document.getElementById('answer-message').setAttribute('style',
            'visibility: visible; display: block;')

    }

    handleNextQuestionClick = (evt) => {
        this.getQuestion(this.state.category)
    }

    render() {
        return (
            <Fragment>
                {
                    !this.state.questionLoading &&
                    <Paper className='paper'>
                        <Typography variant='headline' className='question-title'>
                            Question
                        </Typography>

                        <Typography variant='subheading' className='question'>
                            {this.state.question.question}
                        </Typography>

                        <Grid container spacing={16}>
                            {this.shuffle(this.state.question.choices).map(choice =>
                                <Grid item xs={12} key={choice} className='choice-box'
                                    onClick={evt => this.handleChoiceClick(evt, choice)}>
                                    <div className='choice MuiPaper-root-10 MuiPaper-elevation2-14'>{choice}</div>

                                </Grid>
                            )}

                            <Paper id='answer-message' elevation={4}>
                                <Typography variant='h6' color='inherit'>
                                    The correct answer is {this.state.correctAnswer}.
                                </Typography>
                            </Paper>

                            <Button id="btnNextQuestion"
                                xs={12}
                                variant="contained"
                                color="primary"
                                onClick={this.handleNextQuestionClick}
                                >
                                Next Question
                            </Button>


                        </Grid>
                    </Paper>
                }

                {
                    this.state.questionLoading
                    &&
                    <Paper className='loading-paper'>
                        <Typography variant='subheading'>
                            Loading question. Please wait.
                        </Typography>
                        <LinearProgress color='primary' />
                    </Paper>
                }

            </Fragment>
        )
    }
}