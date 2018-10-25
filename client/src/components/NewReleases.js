import React, {Component} from 'react';
import axios from 'axios';
import { Card, Image } from 'semantic-ui-react'
import TextTruncate from 'react-text-truncate'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

class NewReleases extends Component {

  constructor(props) {
    super(props);
    let today = new Date(),
        currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
        lastMonthDate = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate();

    this.state = {
      nowPlayingMovies: [],
      currentDate: currentDate,
      lastMonthDate: lastMonthDate
    };
  }

  componentDidMount(){
    let lastMonthDate = this.state.lastMonthDate
    let currentDate = this.state.currentDate
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=75827d106473f53ac8bf39883a5f17a2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2018&primary_release_date.gte=${lastMonthDate}&primary_release_date.lte=${currentDate}`)
    .then(response => {
      this.setState({nowPlayingMovies: response.data.results})
    })
  }

  render() {
    let movies;
    if(this.state.nowPlayingMovies.length !== 0){
        movies = this.state.nowPlayingMovies.map((movie , index) => {
          return(
            <Card key={movie.id}>
              <Link to={'/movie/' + movie.id}>
              <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              <Card.Content>
                <Card.Header>{movie.original_title}</Card.Header>
                <Card.Meta>
                  <span className='date'><Moment format="DD/MM/YYYY">{movie.release_date}</Moment></span>
                </Card.Meta>
                <Card.Description>
                  <TextTruncate
                      line={2}
                      truncateText="…"
                      text={movie.overview}
                      textTruncateChild={<p><a href="#">Read on</a></p>}
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <p>{movie.vote_average}/10</p>
              </Card.Content>
              </Link >
            </Card>
          );
        });
    }

    return(
      <div className="newReleasesContainer">
        <h3>Now Playing (UK Box Office):</h3>
        <div className="movies">{movies}</div>
      </div>
    )
  }
}

export default NewReleases
