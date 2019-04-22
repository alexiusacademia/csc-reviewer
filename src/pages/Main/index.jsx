import React from 'react'
import * as firebase from 'firebase'
import Login from '../../components/Login'
import Logout from '../../components/Logout'

export default class Main extends React.Component {

    state = {
        loggedIn: false
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
                    <Logout />
                }
            </div>
        )
    }
}