import React, { Component } from 'react'
import MovieResult from './MovieResult';

export default class MovieResults extends Component {
    render() {
        const movies = this.props.searchResults.map((movie, i) => {
            return (
                <MovieResult
                    key={i}
                    data={movie}
                     
                    addNewMovie={this.props.addNewMovie}
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
