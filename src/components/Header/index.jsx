import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Drawer, Hidden } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Categories from '../Categories'
import Logout from '../../components/Logout'
import './index.css'

export default class Header extends React.Component {
    toggleDrawer = (open) => {
        this.props.toggleLeftDrawer()
    }

    render() {
        return (
            <AppBar position='fixed' className={this.props.class}>
                <Toolbar>
                    {
                        this.props.loggedIn
                        &&
                        <Hidden smUp implementation='css'>
                            <IconButton color='inherit' onClick={this.toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                        </Hidden>

                    }

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