import React, { Fragment } from 'react'
import Login from '../../components/Login'
import Categories from '../../components/Categories'
import Question from '../../components/Question'
import Header from '../../components/Header'
import './index.css'
import { Drawer, Hidden, CssBaseline, withStyles, Typography } from '@material-ui/core'
import WelcomeMessage from '../../components/WelcomeMessage';
import Footer from '../../components/Footer';

const drawerWidth = 240

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
})

class Main extends React.Component {

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
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header loggedIn={this.props.loggedIn} toggleLeftDrawer={this.toggleLeftDrawer} class={classes.appBar} />
                <nav className={classes.drawer}>
                    <Hidden smUp implementation='css'>
                        <Drawer
                            variant='temporary'
                            open={this.state.openLeftDrawer}
                            onClose={this.toggleDrawer(false)}
                            classes={{
                                paper: classes.drawerPaper,
                            }}>
                            <div
                                role="button"
                                onClick={this.toggleDrawer(false)}
                                onKeyDown={this.toggleDrawer(false)}>
                                {
                                    this.props.loggedIn &&
                                    <Categories onCategorySelected={this.categorySelected} />
                                }

                            </div>
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation='css'>
                        {
                            this.props.loggedIn &&
                            <Drawer
                                variant='permanent'
                                open
                                classes={{
                                    paper: classes.drawerPaper,
                                }}>
                                <Categories onCategorySelected={this.categorySelected} />
                            </Drawer>
                        }

                        {
                            !this.props.loggedIn &&
                            <Fragment>
                                <Typography variant='headline' color='inherit' className='side-intro-title'>
                                    SyncSoft Solutions
                                </Typography>
                                <Typography paragraph className='side-intro-par'>
                                    This service is brought to you by SyncSoft Solutions for free
                                    as aide in the review for civil service exams. Please login to use the service.
                                </Typography>
                                <Typography paragraph className='side-intro-par'>
                                    For support or inquiries, contact us at <em>syncsoftsolutions. software@gmail.com</em>
                                </Typography>
                            </Fragment>
                        }

                    </Hidden>
                </nav>

                <main className={classes.content}>
                    {
                        this.state.showQuestion && this.props.loggedIn &&
                        <Question category={this.state.selectedCategory} />
                    }
                    {
                        !this.state.showQuestion &&
                        <WelcomeMessage />
                    }
                    {
                        !this.props.loggedIn &&
                        <Login />
                    }
                    <Footer />
                </main>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Main)