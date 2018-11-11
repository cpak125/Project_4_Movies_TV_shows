import React, { Component } from 'react'
import { Button, Card, Image, CardContent, Grid } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledCard= styled(Card)`
&&&{
  margin-bottom:4vw;
}
`
const StyledHeader = styled(Card.Header)`
&&&{
  font-size:20px;
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
                <Image src={this.props.poster_path} alt='movie poster' />
              </Grid.Column>
              <Grid.Column width={12}>
                <StyledHeader>{this.props.title}</StyledHeader>
                <Card.Description>{this.props.release_date}</Card.Description>
                <Card.Description>{this.props.overview}</Card.Description>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button color='green' floated='right'
                  onClick={() => this.addNewMovie(
                    this.props.title, this.props.movie_id, this.props.release_date,
                    this.props.overview, this.props.poster_path)}>Add to List
             </Button>


        </Card.Content>
      </StyledCard>
    )
  }
}
