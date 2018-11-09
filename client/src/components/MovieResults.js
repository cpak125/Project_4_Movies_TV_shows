import React, { Component } from 'react'
import MovieResult from './MovieResult';

export default class MovieResults extends Component {
    render() {
        const movies = this.props.searchResults.map((movie, i) => {
            const poster_path = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
            return (
                <MovieResult
                    key={i}
                    title={movie.title}
                    movie_id={movie.id}
                    release_date={movie.release_date}
                    poster_path={poster_path}
                    overview={movie.overview}
                    addNewMovie={this.props.addNewMovie}
                    toggleAddMovie={this.props.toggleAddMovie}
                    resetSearch={this.props.resetSearch}
                    handleClose={this.props.handleClose}
                    userId={this.props.userId}
                />

            )
        })
        return (
            <div>
                {movies}
            </div>
        )
    }
}
