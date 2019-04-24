import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Drawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Categories from '../Categories'
import Logout from '../../components/Logout'
import './index.css'

export default class Header extends React.Component {

    state = {
        open: false
    }

    toggleDrawer = (open) => {
        this.setState({
            open: open
        })
    }

    render() {
        return (
            <AppBar position='fixed' className='appbar'>
                <Toolbar>
                    <IconButton color='inherit' onClick={this.toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" className="app-title" color="inherit" >
                        Civil Service Reviewer
                    </Typography>
                    {
                        this.props.loggedIn
                        &&
                        <Logout />
                    }
                </Toolbar>
                <Drawer open={this.state.open}>
                    <Categories />
                </Drawer>
            </AppBar>
        )
    }
}