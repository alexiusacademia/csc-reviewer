import React from 'react'
import Login from '../../components/Login'
import Categories from '../../components/Categories'
import './index.css'
import { Grid } from '@material-ui/core';

export default class Main extends React.Component {
    
    render() {
        return (
            <Grid>
                {
                    !this.props.loggedIn &&
                    <Login />
                }
                {
                    this.props.loggedIn &&
                    <Categories />
                }
            </Grid>
        )
    }
}