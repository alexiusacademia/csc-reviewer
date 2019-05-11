import React, { Fragment } from 'react'
import * as firebase from 'firebase'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'
import Question from '../Question'
import { Typography, Paper, LinearProgress } from '@material-ui/core';
import './index.css'

export default class Categories extends React.Component {

    state = {
        categories: [],
        categoriesLoading: true,
        selectedCategory: 0,
        showQuestion: false,
        question: null,
        questionLoading: false,
        activeUsers: 0
    }

    componentDidMount() {
        var cats = []
        const db = firebase.firestore()
        db.collection('categories').get()
            .then((result) => {

                result.forEach((doc) => {
                    cats.push({
                        'name': doc.data().name,
                        'id': doc.id
                    })
                })
                this.setState({
                    categories: cats,
                    categoriesLoading: false
                })
            })
        // this.manageState(db)
    }

    componentWillReceiveProps() {
        const db = firebase.firestore()
        this.manageState(db)
    }

    manageState = (db) => {
        firebase.auth().onAuthStateChanged((user) => {
            db.collection('users').where('uid', '==', user.uid).get().then((result) => {
                let docs = []
                result.forEach((doc) => {
                    docs.push(doc.id)
                    // console.log(doc.id)
                })

                if (docs.length === 0) {
                    db.collection('users').add({
                        uid: user.uid,
                        time_active: Date.now() / 1000 / 60
                    }) 
                } else {
                    db.collection('users').doc(docs[0]).set({
                        uid: user.uid,
                        time_active: Date.now() / 1000 / 60
                    })
                }
            })

            const currentTime = Date.now() / 1000 / 60
            const maxIdleTime = 3.0 // Minutes

            db.collection('users').get().then((result2) => {
                let active_users_count = 0
                result2.forEach((doc2) => {
                    const lastActive = doc2.data().time_active
                    if ((currentTime - lastActive) <= maxIdleTime) {
                        active_users_count++
                        console.log(doc2.data())
                    }
                    this.setState({
                        activeUsers: active_users_count
                    })
                })
            })
        })
    }

    handleCategoryClick = (id) => {
        /* this.setState({
            selectedCategory: id,
            showQuestion: true
        }) */
        this.props.onCategorySelected(id)
    }

    render() {
        return (
            <Fragment>
                <Paper className='category-paper'>
                    <Typography variant='headline' color='inherit'>
                        Categories
                    </Typography>
                    <Divider />
                    {
                        !this.state.categoriesLoading &&
                        <Fragment>
                            <List>
                            {this.state.categories.map(c =>
                                <div key={c.id} className='bg'>
                                    <ListItem
                                        button
                                        selected={this.state.selectedCategory === c.id}
                                        onClick={evt => this.handleCategoryClick(c.id)}>
                                        <ListItemText primary={c.name} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )}
                        </List>
                        <div>
                            Active Users: {this.state.activeUsers}
                        </div>
                        </Fragment>
                    }
                    {
                        this.state.categoriesLoading &&
                        <Paper className='loading-paper'>
                            <Typography variant='subheading'>
                                Please wait.
                            </Typography>
                            <LinearProgress color='primary'/>
                        </Paper>
                    }

                </Paper>
                {
                    this.state.showQuestion
                    &&
                    <Question
                        category={this.state.selectedCategory} />
                }
            </Fragment>
        )
    }
}