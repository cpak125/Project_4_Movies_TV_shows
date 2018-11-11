import React, { Component } from 'react'
import TVShowResult from './TVShowResult';
import styled from 'styled-components'

const ResultsContainer=styled.div`
margin-top:2vw;
`

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
                    handleClose={this.props.handleClose}
                />
            )
        })

    return (
      <ResultsContainer>
        {tvShows}
      </ResultsContainer>
    )
  }
}
