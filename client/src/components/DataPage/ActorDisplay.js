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
    let filterMoviesCast
    let filterTvCast
    let filterMoviesCrew
    let filterTvCrew
    const { activeIndex } = this.state

    if(this.props.actorInfo.length !== 0){
      actorInfo  = this.props.actorInfo
      actorDescription = actorInfo.biography
      combined_credits = actorInfo.combined_credits
      cast = combined_credits.cast
      crew = combined_credits.crew
      if(actorInfo.birthday){
        birthday = "Born " + actorInfo.birthday.split("-").reverse().join("/") + " in " + this.props.actorInfo.place_of_birth
      }
      filterMoviesCast = cast
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
      filterMoviesCrew = crew
                      .filter(movie => movie.media_type === "movie")
                      .map((movie , index) => {
                            return(
                              <Item key={movie.id}>
                                <Item.Content>
                                  <Item.Header as='a'><Link to={'/movie/' + movie.id}>{movie.title}</Link></Item.Header>
                                  <Item.Meta>{movie.job}</Item.Meta>
                                </Item.Content>
                              </Item>
                            );
                      });

      filterTvCast = cast
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

        filterTvCrew = crew
                    .filter(tv => tv.media_type === "tv")
                    .map((tv , index) => {
                          return(
                            <Item key={tv.id}>
                              <Item.Content>
                                <Item.Header as='a'><Link to={'/tv/' + tv.id}>{tv.name}</Link></Item.Header>
                                <Item.Meta>{tv.job}</Item.Meta>
                              </Item.Content>
                            </Item>
                          );
                    });
    }

    if(actorDescription){
      actorDescription = actorDescription.replace(/\n\n/g , "</p><p>")
    }

    const level1Panels = [
      { key: 'panel-1a', title: 'Cast', content: filterMoviesCast },
      { key: 'panel-ba', title: 'Crew', content: filterMoviesCrew },
    ]

    const Level1Content = (
      <div>
          <Accordion.Accordion panels={level1Panels} />
      </div>
    )

    const level2Panels = [
      { key: 'panel-2a', title: 'Cast', content: filterTvCast },
      { key: 'panel-2b', title: 'Crew', content: filterTvCrew },
    ]

    const Level2Content = (
      <div>
        <Accordion.Accordion panels={level2Panels} />
      </div>
    )

    const rootPanels = [
      { key: 'panel-1', title: 'Movies', content: { content: Level1Content } },
      { key: 'panel-2', title: 'TV', content: { content: Level2Content } },
    ]

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
                <Accordion defaultActiveIndex={0} panels={rootPanels} styled />

              </Segment>
        </div>
      )
    }
};

export default ActorDisplay;

// <Accordion fluid>
//   <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
//      <Icon name='dropdown' />
//      Movies
//    </Accordion.Title>
//    <Accordion.Content active={activeIndex === 0}>
//    <Item.Group divided>
//      {filterMoviesCast}
//    </Item.Group>
//    </Accordion.Content>
//    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
//     <Icon name='dropdown' />
//     TV
//   </Accordion.Title>
//     <Accordion.Content active={activeIndex === 1}>
//       <Item.Group divided>
//         {filterTvCast}
//       </Item.Group>
//     </Accordion.Content>
// </Accordion>
