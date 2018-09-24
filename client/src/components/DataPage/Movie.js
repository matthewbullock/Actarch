import React, {Component} from 'react';
import MovieDisplay from './MovieDisplay'
import axios from 'axios';

class MovieData extends Component {
  state = {
    id: null,
    movieInfo: []
  }

  componentDidMount() {
      let id = this.props.match.params.movie_id
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=75827d106473f53ac8bf39883a5f17a2&language=en-US`)
        .then(response => {
          this.setState({
            id: id,
            movieInfo: response.data
          })
      })
  }

  render() {
    return (
      <div className="movie-container">
        <MovieDisplay movieInfo={this.state.movieInfo} />
      </div>
    )
  }
}



export default MovieData;
