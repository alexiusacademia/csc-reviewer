import React from 'react'
import * as firebase from 'firebase'

export default class Login extends React.Component {
    login = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log(result.user)
                this.setState({
                    loggedIn: true
                })
            })
    }

    render() {
        return (
            <div>
                <p>Not Logged in</p>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}