import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

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
      <header>
        <ul className="main-nav">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink exact to="/search">Search</NavLink></li>
          {
            isAuthenticated() && (
              <li><NavLink exact to="/profile">Profile</NavLink></li>
            )
          }
          {
            !isAuthenticated() && (
              <li><a onClick={this.login.bind(this)}>Log In</a></li>
            )
          }
          {
            isAuthenticated() && (
              <li><a onClick={this.logout.bind(this)}>Log Out</a></li>
            )
          }
        </ul>
      </header>
    )
  }
}
export default NavBar
