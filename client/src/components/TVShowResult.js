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
                                <Image rounded size='small' src={this.props.poster_path} alt='show poster' />
                            </Grid.Column>
                            <Grid.Column stretched mobile={12}>
                                <StyledHeader>{this.props.name}</StyledHeader>
                                <Card.Description><b>FIRST AIR DATE: </b>{this.props.first_air_date}</Card.Description>
                                <Card.Description><b>OVERVIEW:</b> {this.props.overview}</Card.Description>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button color='green' floated='right' size='small'
                        onClick={() => this.addNewTVShow(this.props.name, this.props.tv_id,
                            this.props.first_air_date, this.props.overview, this.props.poster_path)}
                    >Add to List
                    </Button>
                </Card.Content>
            </StyledCard>
        )
    }
}
