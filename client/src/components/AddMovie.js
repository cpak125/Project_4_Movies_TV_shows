import React, { Component } from 'react'
import MovieSearch from './MovieSearch';
import MovieResults from './MovieResults';

export default class AddMovie extends Component {
    state = {
        searching: true,
        searchResults: []
    }

    transferResult = (response) => {
        this.setState({ searchResults: response.data.results})
    }

    toggleSearching = () => {
        this.setState({ searching: !this.state.searching })
    }

    render() {
        return (
            <div>
                    <h1>Add Movie</h1>
                    <MovieSearch
                    transferResult={this.transferResult}
                    searching={this.state.searching}
                    toggleSearching={this.toggleSearching} />

                    {this.state.searching ? null : 
                    <MovieResults 
                    searchResults={this.state.searchResults} 
                    addNewMovie={this.props.addNewMovie}
                    toggleAddMovie={this.props.toggleAddMovie}
                    />}

            </div>
        )
    }
}
