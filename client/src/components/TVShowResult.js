import React, { Component } from 'react'
import { Button, Card, Image, Grid } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledCard = styled(Card)`
&&&{
  margin-bottom:4vw;
}
`
const StyledHeader = styled(Card.Header)`
&&&{
  font-size:20px;
}
`

export default class TVShowResult extends Component {

    addNewTVShow = (tvId, name, firstAirDate, overview, posterPath) => {
        this.props.addNewTVShow(tvId, name, firstAirDate, overview, posterPath)
        this.props.handleClose()
    }

    render() {
        return (
            <StyledCard fluid raised>
                <Card.Content>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column mobile={4} stretched>
                                <Image fluid size='small' src={this.props.poster_path} alt='show poster' />
                            </Grid.Column>
                            <Grid.Column stretched mobile={12}>
                                <StyledHeader>{this.props.name}</StyledHeader>
                                <Card.Description><b>First air date: </b>{this.props.first_air_date}</Card.Description>
                                <Card.Description><b>Overview:</b> {this.props.overview}</Card.Description>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                        <Button color='green' floated='right'
                         onClick={() => this.addNewTVShow(this.props.name, this.props.tv_id,
                          this.props.first_air_date, this.props.overview, this.props.poster_path)}
                          >Add to List
                          </Button>
                </Card.Content>
            </StyledCard>
        )
    }
}
