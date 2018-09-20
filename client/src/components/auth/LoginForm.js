import React, {Component} from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };


    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange (event) {
    //handles multiple text fields
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render(){
    if (this.state.sessionToken) {
       this.props.auth.redirect({ sessionToken: this.state.sessionToken });
       return null;
    }
    const errorMessage = this.state.error ?
    <span className="error-message">{this.state.error}</span> : null;

    return(
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <Form onSubmit={this.handleSubmit} size='large'>
              {errorMessage}
              <Segment stacked>
                <Form.Input name="username" fluid icon='user' iconPosition='left' placeholder='Username' type="username" onChange={this.handleChange} />
                <Form.Input
                  name="password"
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
                />
                <Button color='teal' fluid size='large' disabled={!this.validateForm()}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};
