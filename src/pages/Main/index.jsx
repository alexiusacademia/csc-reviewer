import React from 'react'
import Login from '../../components/Login'
import Categories from '../../components/Categories'
import Question from '../../components/Question'
import Header from '../../components/Header'
import './index.css'
import { Grid, Drawer } from '@material-ui/core';

export default class Main extends React.Component {

    state = {
        openLeftDrawer: false,
        showQuestion: false,
        selectedCategory: null
    }

    toggleLeftDrawer = () => {
        this.setState({
            openLeftDrawer: true,
            showQuestion: false
        })
    }

    toggleDrawer = (open) => () => {
        this.setState({
            openLeftDrawer: open
        })
    }

    categorySelected = (catId) => {
        this.setState({
            selectedCategory: catId,
            showQuestion: true
        })
    }

    render() {

        const drawer = (
            <Categories />
        )

        return (
            <Grid className='container'>
                <Grid item xs={12}>
                    <Header loggedIn={this.props.loggedIn} toggleLeftDrawer={this.toggleLeftDrawer} />
                    {
                        !this.props.loggedIn &&
                        <Login />
                    }
                </Grid>
                <Grid item xs={4}>
                    <Drawer
                        open={this.state.openLeftDrawer}
                        onClose={this.toggleDrawer(false)}>
                        <div
                            role="button"
                            onClick={this.toggleDrawer(false)}
                            onKeyDown={this.toggleDrawer(false)}>
                            <Categories onCategorySelected={this.categorySelected} />
                        </div>
                    </Drawer>
                </Grid>

                <Grid item xs={12}>
                    {
                        this.state.showQuestion &&
                        <Question category={this.state.selectedCategory} />
                    }
                </Grid>

            </Grid>
        )
    }
}