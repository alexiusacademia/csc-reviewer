import React from 'react'
import * as firebase from 'firebase'

export default class Main extends React.Component {

    state = {
        loggedIn: false
    }

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

    logout = () => {
        firebase.auth().signOut().then(() => {
            this.setState({
                loggedIn: false
            })
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    loggedIn: true
                })
            } else {
                this.setState({
                    loggedIn: false
                })
            }
        })
    }

    render() {
        return (
            <div>
                {
                    !this.state.loggedIn
                    &&
                    <div>
                        <p>Not Logged in</p>
                        <button onClick={this.login}>Login</button>
                    </div>
                }
                {
                    this.state.loggedIn
                    &&
                    <div>
                        Logged in
                        <button onClick={this.logout}>Logout</button>    
                    </div>
                }
            </div>
        )
    }
}