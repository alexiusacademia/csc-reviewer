import React from 'react'
import Login from '../../components/Login'
import Categories from '../../components/Categories'

export default class Main extends React.Component {

    render() {
        return (
            <div>
                {
                    !this.props.loggedIn &&
                    <Login />
                }
                {
                    this.props.loggedIn &&
                    <Categories />
                }
            </div>
        )
    }
}