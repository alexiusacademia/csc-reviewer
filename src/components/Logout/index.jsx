import React from 'react'
import * as firebase from 'firebase'

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
                    !this.loggedIn &&
                    <button onClick={this.logout}>Logout</button>
                }
            </div>
        )
    }
}