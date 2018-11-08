import React, { Component } from 'react'
import TVShowSearch from './TVShowSearch';
import TVShowResults from './TVShowResults';

export default class AddTVShow extends Component {
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
          <h1>Add TV Show</h1>
                    <TVShowSearch
                    transferResult={this.transferResult}
                    searching={this.state.searching}
                    toggleSearching={this.toggleSearching} />

                    {this.state.searching ? null : 
                    <TVShowResults
                    searchResults={this.state.searchResults} 
                    addNewTVShow={this.props.addNewTVShow}
                    toggleAddTVShow={this.props.toggleAddTVShow}
                    />}

        
      </div>
    )
  }
}
