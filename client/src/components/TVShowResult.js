import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
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

export default class TVShowResult extends Component {

    addNewTVShow = (tvId, name, firstAirDate, overview, posterPath) => {
        this.props.addNewTVShow(tvId, name, firstAirDate, overview, posterPath)
        this.props.handleClose()
        this.props.resetSearch()
    }

    render() {
        return (
            <div>
                <div><img src={this.props.poster_path} alt='show poster' /></div>
                <div>{this.props.name}</div>
                <div>{this.props.first_air_date}</div>
                <div>{this.props.overview}</div>

                <div>
                    <Button onClick={() => this.addNewTVShow(this.props.name, this.props.tv_id, this.props.first_air_date, this.props.overview, this.props.poster_path)}>Add to List</Button>
                </div>

            </div>
        )
    }
}
