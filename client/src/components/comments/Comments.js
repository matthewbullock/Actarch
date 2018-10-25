import React, {Component} from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
const axios = require('axios');

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      profile: {},
      id: this.props.commentId
    }
    this.updateComments = this.updateComments.bind(this);
  }

  componentDidMount() {
    const { userProfile, getProfile } = this.props.auth;

    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }

    this.callApi()
      .then(comments => {
        this.setState({comments})
      })
      .catch(err => console.log(err));
  }

  updateComments(newComments) {
    this.setState({comments: newComments})
  }

  callApi = async () => {
    const commentId = this.state.id
    const response = await fetch(`/api/comments/${commentId}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return(
      <div className="comments-section">
        <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>
          <CommentForm updateComments={this.updateComments} id={this.state.id} auth={this.props.auth} />
          <CommentList comments={this.state.comments} profile={this.state.profile} />
        </Comment.Group>
      </div>
    )
  }
}

export default Comments
