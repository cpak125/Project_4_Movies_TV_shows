import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'


export default class TVShowResult extends Component {

    addNewTVShow = (tvId, name, firstAirDate, overview, posterPath) => {
        this.props.addNewTVShow(tvId, name, firstAirDate, overview, posterPath)
        this.props.toggleAddTVShow()
    }

    render() {
        return (
            <div>
                <div><img src={this.props.poster_path} alt='show poster' /></div>
                <div>{this.props.name}</div>
                <div>{this.props.first_air_date}</div>
                <div>{this.props.overview}</div>
                <div>{this.props.tv_id}</div>

                <div>
                    <Button onClick={() => this.addNewTVShow(this.props.name, this.props.tv_id, this.props.first_air_date, this.props.overview, this.props.poster_path)}>Add to List</Button>
                </div>




            </div>
        )
    }
}
