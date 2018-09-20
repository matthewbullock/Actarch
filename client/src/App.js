import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

import NavBar from './components/Nav'
import Header from './components/Header'
import NewReleases from './components/NewReleases'
import Login from './components/auth/Login'
import Search from './components/Tables/Search'
import { BrowserRouter , Route } from 'react-router-dom';
import Auth from './components/auth/Auth';
import history from './history';
import Callback from './callback';
import { NavLink } from 'react-router-dom'


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
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <Header />
        <NewReleases />
      </div>
    );
  }
}

export default App;
