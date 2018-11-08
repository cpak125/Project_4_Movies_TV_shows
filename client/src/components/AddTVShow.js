import React, { Component } from 'react'

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
        
      </div>
    )
  }
}
