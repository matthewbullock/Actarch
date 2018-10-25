import React from 'react';
import { Container, Item } from 'semantic-ui-react'

const MovieDisplay = ({movieInfo}) => (
    <div>
      <Container textAlign='left'>
        <Item.Group>
        <Item>
          <Item.Image size='small' src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`} />
          <Item.Content>
            <Item.Header>{movieInfo.original_title}</Item.Header>
            <Item.Meta>{movieInfo.tagline}</Item.Meta>
            <Item.Description>
              {movieInfo.overview}
            </Item.Description>
          </Item.Content>
        </Item>
        </Item.Group>
        </Container>
    </div>
);

export default MovieDisplay;
