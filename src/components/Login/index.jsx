import React from 'react'
import * as firebase from 'firebase'
import { Paper, Typography, Grid } from '@material-ui/core'
import './index.css'

export default class Login extends React.Component {
    login = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // console.log(result.user)
                this.setState({
                    loggedIn: true
                })
            })
    }

    render() {
        return (
            <div>
                <Grid>
                    <Paper className="login-paper" elevation={6}>
                        <Typography variant="title" color="primary" className="login-subtitle">
                            Please login to use the service.
                        </Typography>
                        <img 
                            alt="Google Sign In"
                            onClick={this.login} src="assets/btn_google_signin_dark_normal_web.png"
                            className="signin-button"/>

                        <Typography variant='subtitle2'>
                            <br/>
                            By signing in, you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms and Conditions</a>.
                        </Typography>
                    </Paper>
                </Grid>
            </div>
        )
    }
}