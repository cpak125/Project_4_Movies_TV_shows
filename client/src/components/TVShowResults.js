import React, { Component } from 'react'
import TVShowResult from './TVShowResult';

export default class TVShowResults extends Component {
  render() {
    const tvShows = this.props.searchResults.map((tvShow, i) => {
        const poster_path= `https://image.tmdb.org/t/p/w200/${tvShow.poster_path}`
            return (
                <TVShowResult
                    key={i}
                    name={tvShow.name}
                    tv_id={tvShow.id}
                    first_air_date={tvShow.first_air_date}
                    poster_path={poster_path}
                    overview={tvShow.overview}
                    addNewTVShow={this.props.addNewTVShow}
                    // toggleAddTVShow={this.props.toggleAddTVShow}
                    resetSearch={this.props.resetSearch}
                    handleClose={this.props.handleClose}
                />

            )
        })

    return (
      <div>
        {tvShows}
      </div>
    )
  }
}
