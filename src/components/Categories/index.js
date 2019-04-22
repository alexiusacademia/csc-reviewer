import React from 'react'
import * as firebase from 'firebase'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Categories extends React.Component {

    state = {
        categories: [],
        selectedCategory: 0
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

    handleCategoryClick = (evet, index) => {
        this.setState({
            selectedCategory: index
        })
    }

    render() {
        return (
            <div>
                <List>
                    {this.state.categories.map(c => 
                        <ListItem key={c['id']} 
                            button
                            selected={this.state.selectedCategory === c.id}
                            onClick={event => this.handleCategoryClick(event, c.id)}>
                            <ListItemText primary={c.name} />
                        </ListItem>
                    )}
                </List>

            </div>
        )
    }
}