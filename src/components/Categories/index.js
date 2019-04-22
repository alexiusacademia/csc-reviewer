import React from 'react'
import * as firebase from 'firebase'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Question from '../Question'

export default class Categories extends React.Component {

    state = {
        categories: [],
        selectedCategory: 0,
        showQuestion: false,
        question: null,
        questionLoading: false
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
                    categories: cats
                })
            })
    }

    handleCategoryClick = (id) => {
        this.setState({
            selectedCategory: id,
            showQuestion: true,
            questionLoading: true
        })

        var q = []

        const db = firebase.firestore()

        console.log('Clicked')

        db.collection('questions')
            .where("category", "==", parseInt(id))
            .get()
            .then((result) => {
                result.forEach((doc) => {
                    q.push(doc.data())
                })

                const index = Math.floor(Math.random() * q.length)

                this.setState({
                    question: q[index]
                })

                this.setState({
                    questionLoading: false
                })
            })
    }

    render() {
        return (
            <div>
                <List>
                    {this.state.categories.map(c =>
                        <ListItem key={c.id}
                            button
                            selected={this.state.selectedCategory === c.id}
                            onClick={evt => this.handleCategoryClick(c.id)}>
                            <ListItemText primary={c.name} />
                        </ListItem>
                    )}
                </List>
                {
                    this.state.showQuestion
                    &&
                    <Question 
                        category={this.state.selectedCategory} 
                        question={this.state.question}
                        questionLoading={this.state.questionLoading} />
                }
            </div>
        )
    }
}