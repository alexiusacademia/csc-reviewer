import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Logout from '../../components/Logout'
import './index.css'

export default class Header extends React.Component {

    render() {
        return (
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="h5" className="app-title" color="inherit" >
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