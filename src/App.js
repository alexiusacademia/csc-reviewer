import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Main from './pages/Main';
import * as firebase from 'firebase'

class App extends Component {

  state = {
    loggedIn: true
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
        <Main loggedIn={this.state.loggedIn} />
      </div>
    );
  }
}

export default App;
