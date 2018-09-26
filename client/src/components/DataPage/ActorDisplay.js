import React, {Component} from 'react';
import { Container, Header, Icon, Image , Item , Accordion , Segment , Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'

class ActorDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    let actorInfo
    let combined_credits
    let cast
    let crew
    let actorDescription
    let birthday
    let filterMovies
    let filterTv
    const { activeIndex } = this.state

    if(this.props.actorInfo.length !== 0){
      actorInfo  = this.props.actorInfo
      actorDescription = actorInfo.biography
      combined_credits = actorInfo.combined_credits
      cast = combined_credits.cast
      if(actorInfo.birthday){
        birthday = "Born " + actorInfo.birthday.split("-").reverse().join("/") + " in " + this.props.actorInfo.place_of_birth
      }
      filterMovies = cast
                      .filter(movie => movie.media_type === "movie")
                      .map((movie , index) => {
                            return(
                              <Item key={movie.id}>
                                <Item.Content>
                                  <Item.Header as='a'><Link to={'/movie/' + movie.id}>{movie.title}</Link></Item.Header>
                                  <Item.Meta>{movie.character}</Item.Meta>
                                  <Item.Description>
                                    <p>{movie.overview}</p>
                                  </Item.Description>
                                </Item.Content>
                              </Item>
                            );
                      });

      filterTv = cast
                .filter(tv => tv.media_type === "tv")
                .map((tv , index) => {
                  console.log(tv)
                      return(
                        <Item key={tv.id}>
                          <Item.Content>
                            <Item.Header as='a'><Link to={'/tv/' + tv.id}>{tv.name}</Link></Item.Header>
                            <Item.Meta>{tv.character} - {tv.episode_count} {tv.episode_count == 1 ? "episode" : "episodes"}</Item.Meta>
                            <Item.Description>
                              <p>{tv.overview}</p>
                            </Item.Description>
                          </Item.Content>
                        </Item>
                      );
                });
    }

    if(actorDescription){
      actorDescription = actorDescription.replace(/\n\n/g , "</p><p>")
    }

    return(
        <div>
            <Segment basic>
              <Item.Group divided>
                  <Item>
                    <Item.Image src={`https://image.tmdb.org/t/p/w500/${this.props.actorInfo.profile_path}`} />

                    <Item.Content>
                      <Item.Header as='a'>{this.props.actorInfo.name}</Item.Header>
                      <Item.Meta>
                        <span className='cinema'>{birthday}</span>
                      </Item.Meta>
                      <Item.Description>{ReactHtmlParser(actorDescription)}</Item.Description>
                      <Item.Extra>
                        <Label>IMAX</Label>
                        <Label icon='globe' content='Additional Languages' />
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
                <Accordion fluid>
                  <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                     <Icon name='dropdown' />
                     Movies
                   </Accordion.Title>
                   <Accordion.Content active={activeIndex === 0}>
                      <Item.Group divided>
                        {filterMovies}
                      </Item.Group>
                   </Accordion.Content>
                   <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    TV
                  </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                      <Item.Group divided>
                        {filterTv}
                      </Item.Group>
                    </Accordion.Content>
                </Accordion>
              </Segment>
        </div>
      )
    }
};

export default ActorDisplay;
