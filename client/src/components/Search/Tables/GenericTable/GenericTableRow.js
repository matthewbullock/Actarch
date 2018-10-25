import React, {Component} from 'react';
import {
  Header,
  Table,
  Image
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import axios from 'axios';

class GenericTableRow extends Component{

  constructor() {
    super();
    this.state = {
      actorInfoIsShow: false,
      movieData:[]
    };
  }

  handleClick(){
    let personID
    if(this.props.actor.media_type === "person"){
      personID = this.props.actor.id
      axios.get(`https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=75827d106473f53ac8bf39883a5f17a2&language=en-US`)
        .then(response => {
          console.log("sending data to parent" , personID)
          this.props.sendData(response , personID)
        })
    }
  }

  render() {
    let img
    let resultType = this.props.actor.media_type
    let resultTitle = (resultType === "movie") ? this.props.actor.title : this.props.actor.name
    let resultImgPath =  (resultType === "person") ? this.props.actor.profile_path : this.props.actor.poster_path
    let resultOverview


    if(this.props.actor.profile_path !== null || this.props.actor.poster_path !== null){
      img = <div className="imgContainer"><Image src={`https://image.tmdb.org/t/p/w500/${resultImgPath}`} rounded size='tiny' /></div>
    }

    if(resultType === "person"){
        resultOverview = this.props.actor.known_for.map((film , index) => {
          return(
            <span key={index} className="popularMovie">{film.original_title} </span>
          );
        });
    } else {
      resultOverview = shortenText(this.props.actor.overview , 100)
    }

    function shortenText(text, count){
      return text.slice(0, count) + (text.length > count ? "..." : "");
    }

    return(
      <Table.Row>
        <Table.Cell>
        <Link to={resultType === "person" ? '/person/' + this.props.actor.id : '/movie/' + this.props.actor.id}>
        <Header as='h4' image>
              {img}
             <Header.Content>
                {resultTitle}
               <Header.Subheader>
                <p>{resultType}</p>
                <p>{resultOverview}</p>
              </Header.Subheader>
             </Header.Content>
           </Header>
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}


export default GenericTableRow;
