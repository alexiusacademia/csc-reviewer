import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

export default class Header extends React.Component {
    render() {
        return (
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="h5" color="inherit" >
                        Civil Service Reviewer
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}