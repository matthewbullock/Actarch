import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import NewReleases from './components/NewReleases'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'



class App extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    // const { isAuthenticated } = this.props.auth;

    return (
        <div className="App">
          <Header />
          <NewReleases />
        </div>
    );
  }
}

export default App;
