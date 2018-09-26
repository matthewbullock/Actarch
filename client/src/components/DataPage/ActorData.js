import React, {Component} from 'react';
import {
  Container,
  Divider,
  Image,
  Item
} from 'semantic-ui-react'
import axios from 'axios';
import ActorDisplay from './ActorDisplay'

class ActorData extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: null,
        actorInfo: []
      }
  }

  componentDidMount() {
    console.log("componentDidMount")
      let id = this.props.match.params.person_id
      //actors data call
      axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=75827d106473f53ac8bf39883a5f17a2&language=en-US&append_to_response=combined_credits`)
        .then(response => {
          this.setState({
            id: id,
            actorInfo: response.data
          })
      })
  }

  render() {
    return (
      <div className="actor-container">
        <ActorDisplay actorInfo={this.state.actorInfo} />
      </div>
    )
  }
}
export default ActorData;
