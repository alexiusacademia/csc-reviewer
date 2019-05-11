import React, { Fragment } from 'react'
import * as firebase from 'firebase'
import { Typography, Paper, Grid, Button, LinearProgress } from '@material-ui/core';
import './index.css'
import { Provider, Node } from '@nteract/mathjax'

export default class Question extends React.Component {
    constructor(props) {
        super(props)
        this.choiceHandler = true
    }

    state = {
        choices: [],
        questionLoading: true,
        showNextQuestionButton: false,
        category: null,
        question: {},
        correctAnswer: '',
        hasQuestion: false
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
                if (q.length > 0) {
                    this.setState({
                        question: q[index],
                        correctAnswer: q[index].choices[0],
                        questionLoading: false,
                        hasQuestion: true
                    })

                    this.choiceHandler = true
                } else {
                    this.setState({
                        hasQuestion: false,
                        questionLoading: false
                    })
                    /* document.getElementById('loading-paper').setAttribute('style',
                        'visibility: hidden;') */
                }
            })
    }

    arraymove = (arr, fromIndex, toIndex) => {
        var element = arr[fromIndex]
        arr.splice(fromIndex, 1)
        arr.splice(toIndex, 0, element)
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

        array.map((c, i) => {
            if (c[0] === '*') {
                c = c.substr(5, c.length-5)
                array.splice(i, 1)
                array.splice(3, 0, c)
                return array
            }
        })

        return array;

    }

    handleChoiceClick = (evt, answer) => {
        if (this.choiceHandler) {
            let correctAns = this.state.correctAnswer
            if (this.state.correctAnswer[0] === '*') {
                correctAns = correctAns.substr(5, correctAns.length - 5)
            }
            this.setState({
                correctAnswer: correctAns
            })
            if (answer === correctAns) {
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

            // Show explanation
            if (this.state.question.explanation !== "") {
                document.getElementById('explanation').setAttribute('style',
                    'display: block; visibility: visible;')
            }


            this.choiceHandler = false
        }
    }

    handleNextQuestionClick = (evt) => {
        this.getQuestion(this.state.category)
    }

    isEquation = (str) => {
        const x = str.substring(
            str.lastIndexOf('$') + 1,
            str.lastIndexOf(';')
        )
        return (x.length > 0)
    }

    getEquation = (str) => {
        const x = str.substring(
            str.lastIndexOf('$') + 1,
            str.lastIndexOf(';')
        )
        return x
    }

    render() {
        return (
            <Fragment>
                {
                    !this.state.questionLoading && this.state.hasQuestion &&
                    <Paper className='paper'>
                        <Typography variant='headline' className='question-title'>
                            Question
                        </Typography>

                        <Typography xs={12} variant='subheading' className='question'>
                            {
                                // Question
                                this.state.question.question.split('\\n').map((item, id) =>
                                    <div key={id}>
                                        {
                                            this.isEquation(item) &&
                                            <Provider>
                                                <Node inline>{this.getEquation(item)}</Node>
                                            </Provider>
                                        }
                                        {
                                            !this.isEquation(item) &&
                                            <div>{item}</div>
                                        }
                                    </div>
                                )
                            }
                        </Typography>

                        <Grid container spacing={16}>
                            { // Choices 
                            this.shuffle(this.state.question.choices).map((choice, key) =>
                                <Grid item xs={12} sm={6} md={3} key={key} id='choice-box'
                                    onClick={
                                        evt => this.handleChoiceClick(evt, choice)
                                    }
                                >
                                    <div className='choice MuiPaper-root-10 MuiPaper-elevation2-14'>
                                        { choice.split('\\n').map((line, index) =>
                                            <Fragment key={index}>
                                                {
                                                    this.isEquation(line) &&
                                                    <Provider>
                                                        <Node inline>{this.getEquation(line)}</Node>
                                                    </Provider>
                                                }
                                                {
                                                    !this.isEquation(line) &&
                                                    <Fragment>{line}</Fragment>
                                                }
                                            </Fragment>
                                            
                                        ) }
                                    </div>
                                </Grid>
                            )}

                            <Grid item xs={12} className="correct-answer">
                                <Paper id='answer-message' elevation={4}>
                                    { /* Correct answer */ }
                                    <Typography variant='h6' color='inherit'>
                                        The correct answer is {this.state.correctAnswer}.
                                    </Typography>
                                </Paper>
                            </Grid>

                            
                            {
                                // Explanation
                                this.state.question.explanation !== "" &&
                                <Grid item xs={12}>
                                    <Paper id='explanation' className='explanation'>

                                        {this.state.question.explanation.split('\\n').map((item) =>
                                            <div key={item}>
                                                {
                                                    this.isEquation(item) &&
                                                    <Provider>
                                                        <Node inline>{this.getEquation(item)}</Node>
                                                    </Provider>
                                                }
                                                {
                                                    !this.isEquation(item) &&
                                                    <div>{item}</div>
                                                }
                                            </div>
                                        )
                                        }

                                    </Paper>
                                </Grid>
                            }
                            <Button id="btnNextQuestion"
                                className="buttons"
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
                    this.state.questionLoading && this.state.hasQuestion
                    &&
                    <Paper className='paper' id='loading-paper'>
                        <Typography variant='subheading'>
                            Loading question. Please wait.
                        </Typography>
                        <LinearProgress color='primary' />
                    </Paper>
                }

                {
                    !this.state.questionLoading && !this.state.hasQuestion &&
                    <Paper className="no-question-available">
                        <p>There are no question available for you from this category. Please choose other category to answer.</p>
                        
                    </Paper>
                }

            </Fragment>
        )
    }
}