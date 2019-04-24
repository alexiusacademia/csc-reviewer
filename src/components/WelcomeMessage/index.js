import React, { Fragment } from 'react'
import {Typography} from '@material-ui/core'
import './index.css'

export default class WelcomeMessage extends React.Component {
    render() {
        return (
            <Fragment>
                <Typography variant='title' className='welcome-title'>
                    Online Civil Service Reviewer
                </Typography>
                <Typography variant='overline' paragraph>
                    This online service is provided to you for free by <strong>SyncSoft Solutions</strong> to help individuals in their review 
                    for the <u>Civil Service Commission</u> exam. Please note that this is not a replacement
                    for a review class or books, instead will act as a handy tool for recalling some random
                    topics and questions from the past exams.
                </Typography>
                <Typography variant='overline' paragraph>
                    In time, this online reviewer will get a hint of what topics or questions you're getting
                    good at and will show the others more frequently where you struggle the most for a better 
                    learning experience.
                </Typography>
            </Fragment>
        )
    }
}