import React from 'react'
import * as firebase from 'firebase'

export default class Question extends React.Component {

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                Question
            </div>
        )
    }
}