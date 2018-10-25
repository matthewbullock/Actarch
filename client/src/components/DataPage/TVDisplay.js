import React, {Component} from 'react';
import { Icon, Item , Accordion , Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


class TVDisplay extends Component {
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
    let tvInfo = this.props.tvInfo
    let firstDate
    let endDate
    let creators
    let stars
    let featuredStars
    let crew
    const { activeIndex } = this.state

    if(this.props.tvInfo.length !== 0){
      firstDate = tvInfo.first_air_date.split("-")[0]
      endDate = tvInfo.last_air_date.split("-")[0]
      creators = tvInfo.created_by.map((creator , index) => {
            return(
              <Item key={creator.id}>
                <Link to={"/person/" + creator.id}><p>{creator.name}</p></Link>
              </Item>
            );
      })
      stars = tvInfo.credits.cast.map((cast , index) => {
        return(
          <Item key={cast.id}>
          <Item.Image size='tiny' src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} />

            <Item.Content>
              <Item.Header as='a'><Link to={'/person/' + cast.id}>{cast.name}</Link></Item.Header>
              <Item.Meta>{cast.character}</Item.Meta>
              <Item.Description>
                <p>{cast.overview}</p>
              </Item.Description>
            </Item.Content>
          </Item>
        );
      })
      crew = tvInfo.credits.crew.map((crew , index) => {
        return(
          <Item key={crew.id}>
            <Item.Content>
              <Item.Header as='a'><Link to={'/person/' + crew.id}>{crew.name}</Link></Item.Header>
              <Item.Meta>{crew.job}</Item.Meta>
              <Item.Description>
                <p>{crew.department}</p>
              </Item.Description>
            </Item.Content>
          </Item>
        );
      })
      featuredStars = tvInfo.credits.cast.slice(0 , 3).map((cast , index) => {
        return(
          <Link to={"/person/" + cast.id} key={cast.id}>{cast.name}</Link>
        );
      })

    }



    return(
      <div>
      <Segment basic>
        <Item.Group divided>
          <Item>
            <Item.Image size='small' src={`https://image.tmdb.org/t/p/w500/${tvInfo.poster_path}`} />
            <Item.Content>
              <Item.Header>{tvInfo.name} ({firstDate} - {endDate})</Item.Header>
              <Item.Meta>{this.props.tvInfo.vote_average}/10</Item.Meta>
              <Item.Meta>Status: {this.props.tvInfo.status}</Item.Meta>
              <Item.Meta>Created by: {creators}</Item.Meta>
              <Item.Meta>Stars: {featuredStars}</Item.Meta>
              <Item.Description>
                {tvInfo.overview}
              </Item.Description>
            </Item.Content>
          </Item>
          </Item.Group>
          <Accordion fluid>
            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
               <Icon name='dropdown' />
               Cast
             </Accordion.Title>
             <Accordion.Content active={activeIndex === 0}>
                <Item.Group divided>
                  {stars}
                </Item.Group>
             </Accordion.Content>
             <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
              <Icon name='dropdown' />
              Crew
            </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <Item.Group divided>
                  {crew}
                </Item.Group>
              </Accordion.Content>
          </Accordion>
          </Segment>
      </div>
      )
    }
};

export default TVDisplay;
