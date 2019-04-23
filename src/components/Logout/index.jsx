import React from 'react'
import * as firebase from 'firebase'
import {Button, withStyles} from '@material-ui/core'

export default class Logout extends React.Component {

    logout = () => {
        firebase.auth().signOut().then(() => {
            this.setState({
                loggedIn: false
            })
        })
        console.log('Logout')
    }

    render() {
        return (
            <div>
                {
                    <Button variant="contained" color="secondary" onClick={this.logout}>Logout</Button>
                }
            </div>
        )
    }
}