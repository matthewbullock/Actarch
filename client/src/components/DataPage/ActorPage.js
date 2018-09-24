import React, {Component} from 'react';
import {
  Container,
  Divider,
  Image,
  Item
} from 'semantic-ui-react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'


class ActorPage extends Component {

  componentDidMount() {
    this.props.getActorsInfo()
  }

  render() {
    let actors;
    let actorInfo = this.props.actorInfo
    let actorDescription = this.props.actorInfo.biography
    let birthday

    if(this.props.actorInfo.birthday){
      birthday = this.props.actorInfo.birthday.split("-").reverse().join("/")
    }

    if(actorDescription){
      actorDescription = actorDescription.replace(/\n\n/g , "</p>")
    }


    if(this.props.actorData.length !== 0){
        actors = this.props.actorData.cast.map((actor , index) => {
          return(
            <Item>
              <Item.Image size='tiny' src={`https://image.tmdb.org/t/p/w500/${actor.poster_path}`} />
              <Item.Content>
                <Item.Header as='a'>{actor.title}</Item.Header>
                <Item.Meta>{actor.character}</Item.Meta>
                <Item.Description>
                  <p>{actor.overview}</p>
                </Item.Description>
              </Item.Content>
            </Item>
          );
        });
    }

    return(
      <div>
      <Container textAlign='left'>
        <Item.Group>
          <Item>
            <Item.Image size='small' src={`https://image.tmdb.org/t/p/w500/${actorInfo.profile_path}`} />
            <Item.Content>
              <Item.Header as='a'>{actorInfo.name}</Item.Header>
              <Item.Meta>{birthday}</Item.Meta>
              <Item.Meta>{actorInfo.place_of_birth}</Item.Meta>
              <Item.Description>
                {actorDescription}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
        <h2>Movies:</h2>
        <Item.Group>
          {actors}
        </Item.Group>
      </Container>
    </div>
    );
  }
}



export default ActorPage;
