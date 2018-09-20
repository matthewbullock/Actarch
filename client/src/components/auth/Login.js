import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoginForm />
    )
  }
}
