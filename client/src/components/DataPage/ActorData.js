import React, {Component} from 'react';
import axios from 'axios';
import ActorDisplay from './ActorDisplay'
import Comments from '../comments/Comments'

class ActorData extends Component {
  constructor(props) {
    super(props);
    this.state = {
        actorInfo: [],
      }
  }

  componentDidMount() {
    const { userProfile, getProfile } = this.props.auth
    let id = this.props.match.params.person_id
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }

    //actors data call
    axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=75827d106473f53ac8bf39883a5f17a2&language=en-US&append_to_response=combined_credits`)
        .then(response => {
          this.setState({
            actorInfo: response.data
          })
      })
  }

  render() {
    return (
      <div className="actor-container">
        <ActorDisplay actorInfo={this.state.actorInfo} />
        <Comments commentId={this.props.match.params.person_id} auth={this.props.auth} />
      </div>
    )
  }
}
export default ActorData;
