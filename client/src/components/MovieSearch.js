import React, { Component } from 'react'
import axios from 'axios'

export default class MovieSearch extends Component {
    state = {
        searchQuery: ''
    }

    inputChangeHandler = (event) => {
        this.setState({ searchQuery: event.target.value })
    }

    searchButtonHandler = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${this.state.searchQuery}&api_key=0832ef538fd529b929aeda8e57b1c0ed`)
        console.log(response.data)
        this.props.transferResult(response)
        this.props.toggleSearching()
      }
    
    newSearchHandler = () => {
        this.props.toggleSearching()
      }

    render() {
        return (
            <div>
                {this.props.searching ?
                    <input type='text' value={this.state.searchQuery} onChange={this.inputChangeHandler} /> :
                    null}
                {this.props.searching ?
                    <button onClick={this.searchButtonHandler}>Search</button> :
                    <button onClick={this.newSearchHandler}>New Search</button>}
            </div>
        )
    }
}
