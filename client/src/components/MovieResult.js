import React, { Component } from 'react'
import { Button, Card, Image, Grid } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledCard= styled(Card)`
&&&{
  margin-bottom:4vw;
  font-family: 'Ubuntu Mono', monospace;
  background-color:#00120b;
  color:#02c39a;
  font-size:18px;
}
`
const StyledHeader = styled(Card.Header)`
&&&{
  font-size:25px;
  font-family: 'Cinzel', serif;
}
`

export default class MovieResult extends Component {

  addNewMovie = (movieId, title, releaseDate, overview, posterPath) => {
    this.props.addNewMovie(movieId, title, releaseDate, overview, posterPath)
    this.props.handleClose()
  }

  render() {
    return (
      <StyledCard fluid raised>
        <Card.Content>
          <Grid stackable>
            <Grid.Row >
              <Grid.Column mobile={4} stretched>
                <Image size='small' rounded src={this.props.poster_path} alt='movie poster' />
              </Grid.Column>
              <Grid.Column stretched mobile={12}>
                <StyledHeader>{this.props.title}</StyledHeader>
                <Card.Description> <b>RELEASE DATE:</b> {this.props.release_date}</Card.Description>
                <Card.Description><b>OVERVIEW:</b> {this.props.overview}</Card.Description>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button color='green' floated='right' size='small'
                  onClick={() => this.addNewMovie(
                    this.props.title, this.props.movie_id, this.props.release_date,
                    this.props.overview, this.props.poster_path)}
                    >Add to List
             </Button>
        </Card.Content>
      </StyledCard>
    )
  }
}
