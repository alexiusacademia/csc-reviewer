import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Question from './pages/Question'
import './App.css';
import Header from './components/Header'
import Main from './pages/Main';
import * as firebase from 'firebase'

class App extends Component {

  state = {
    loggedIn: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true
        })
      } else {
        this.setState({
          loggedIn: false
        })
      }
    })
  }
  render() {
    return (
      <div>
        <Header loggedIn={this.state.loggedIn}/>
        <Main loggedIn={this.state.loggedIn} />
        <Route exact path='/question/:cat' component={Question} /> 
      </div>
    );
  }
}

export default App;
