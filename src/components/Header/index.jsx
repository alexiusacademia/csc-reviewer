import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import Logout from '../../components/Logout'
import './index.css'

export default class Header extends React.Component {

    render() {
        return (
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="h5" color="inherit" className="app-title">
                        Civil Service Reviewer
                    </Typography>
                    {
                        this.props.loggedIn
                        &&
                        <Logout />
                    }
                </Toolbar>
            </AppBar>
        )
    }
}