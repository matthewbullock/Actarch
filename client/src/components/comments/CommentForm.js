import React, {Component} from 'react'
import { Button, Comment, Form, Header, Message } from 'semantic-ui-react'
const axios = require('axios');

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false
    }
    this.displayLoginError = this.displayLoginError.bind(this);
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  displayLoginError(){
    this.setState({error: true});
  }

  postComment(id , body){
    const { updateComments } = this.props
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.post(`/api/comments/${id}`, body , config )
      .then(function (response) {
        axios.get(`/api/comments/${id}`)
          .then(function (response){
            updateComments(response.data)
          })
      })
  }

  handleSubmit(e){
    e.preventDefault()
    const { isAuthenticated } = this.props.auth;
    if(isAuthenticated()){
      let id = this.props.id
      let body = {
        category_id: id,
        username: this.props.auth.userProfile.nickname,
        picture: this.props.auth.userProfile.picture,
        email: this.props.auth.userProfile.name,
        text: this.state.value
      }
      this.postComment(id , body)
    } else {
      this.displayLoginError()
    }
    this.setState({value: ''})
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return(
      <div className="comments-form">
        <h4>Leave a comment: {isAuthenticated()}</h4>
        <Form error={this.state.error} onSubmit={this.handleSubmit} reply>
          <Form.TextArea value={this.state.value} onChange={this.handleChange} />
          <Message
            error
            header='Action Forbidden'
            content='Please log in to place a comment.'
          />
          <Form.Button content='Add Comment' labelPosition='left' icon='edit' primary disabled={!this.state.value} />
        </Form>
      </div>
    )
  }
}
export default CommentForm
