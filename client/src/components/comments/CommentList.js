import React, {Component} from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { IntlMixin, FormattedDate , FormattedRelative } from 'react-intl';

class CommentList extends Component {
  render() {
    let username = this.props.profile.nickname
    let isOwnComment
    let commentNodes = this.props.comments.map(function(comment) {
      if(comment.username === username){
        isOwnComment = true
      }
      return (
        <SingleComment isOwnComment={isOwnComment} key={comment.id} author={comment.username} picture={comment.picture} text={comment.text} time={comment.createdAt} />
      );

    });

    return(
      <div className="comments-list">
        {commentNodes}
      </div>
    )
  }
}

//individual comment
class SingleComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwnComment: false
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(){
    console.log("editing")
  }

  handleDelete(){
    console.log("deleting")
  }

  render() {
    let ownCommentOptions
    let notOwnCommentOptions


      return(
        <Comment>
          <Comment.Avatar src={`${this.props.picture}`} />
          <Comment.Content>
            <Comment.Author as='a'>{this.props.author}</Comment.Author>
            <Comment.Metadata>
              <FormattedRelative
                         value={this.props.time}
                         day="numeric"
                         month="long"
                         year="numeric" />
            </Comment.Metadata>
            <Comment.Text>{this.props.text}</Comment.Text>

            {this.props.isOwnComment ? (
              <Comment.Actions>
                 <Comment.Action>Edit</Comment.Action>
                 <Comment.Action>Delete</Comment.Action>
              </Comment.Actions>
             ) : (
               <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
               </Comment.Actions>
             )}

          </Comment.Content>
        </Comment>
      )
    }
}

CommentList.defaultProps = {
  profile: {
    nickname: null
  },
};

export default CommentList
