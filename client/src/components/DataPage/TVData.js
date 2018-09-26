import React, {Component} from 'react';
import TVDisplay from './TVDisplay'
import axios from 'axios';

class TVData extends Component {
  state = {
    id: null,
    tvInfo: []
  }

  componentDidMount() {
      let id = this.props.match.params.tv_id
      axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=75827d106473f53ac8bf39883a5f17a2&language=en-US&append_to_response=credits`)
        .then(response => {
          this.setState({
            id: id,
            tvInfo: response.data
          })
      })
  }

  render() {
    console.log()
    return (
      <div className="tv-container">
        <TVDisplay tvInfo={this.state.tvInfo} />
      </div>
    )
  }
}



export default TVData;
