import React from 'react'
import Login from '../../components/Login'
import Categories from '../../components/Categories'
import './index.css'
import { Grid, Hidden, Drawer } from '@material-ui/core';

export default class Main extends React.Component {
    render() {

        const drawer = (
            <Categories />
        )

        return (
            <Grid className='container'>
                {
                    !this.props.loggedIn &&
                    <Login />
                }
                {
                    // this.props.loggedIn &&
                    // <Categories />
                }
            </Grid>
        )
    }
}