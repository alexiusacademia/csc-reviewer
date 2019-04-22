import React from 'react'
import * as firebase from 'firebase'
import Login from '../../components/Login'

export default class Main extends React.Component {

    state = {
        loggedIn: false
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
                    <Login />
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