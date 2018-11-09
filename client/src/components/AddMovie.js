import React, { Component } from 'react'
import MovieResults from './MovieResults';
import axios from 'axios'
import { Modal, Button, Input } from 'semantic-ui-react'


export default class AddMovie extends Component {
    state = {
        searching: false,
        searchQuery: '',
        searchResults: [],
        modalOpen: false
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })
  

    transferResult = (response) => {
        this.setState({ searchResults: response.data.results })
    }

    toggleSearching = () => {
        this.setState({ searching: !this.state.searching })
    }

    inputChangeHandler = (event) => {
        this.setState({ searchQuery: event.target.value })
    }

    searchButtonHandler = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${this.state.searchQuery}&api_key=${process.env.REACT_APP_API_KEY}`)
        this.transferResult(response)
        this.toggleSearching()
    }

    newSearchHandler = () => {
        this.resetSearch()
    }


    resetSearch = async () => {
        await this.setState({
            searchQuery: '',
            searchResults: [],
            searching: !this.state.searching
        })

    }

    render() {
        return (
            <div>
                <Modal trigger={<Button onClick={this.handleOpen} >Add a Movie</Button>} closeIcon
                open={this.state.modalOpen}
                onClose={this.handleClose}
                >
                    <Modal.Content>
                        <h1>Search for a Movie</h1>
                    </Modal.Content>

                    <Modal.Content>
                        <Input focus placeholder="Search..." value={this.state.searchQuery} onChange={this.inputChangeHandler} />
                        {this.state.searching ?
                            <button onClick={this.newSearchHandler}>New Search</button> :
                            <button onClick={this.searchButtonHandler}>Search</button>

                        }
                    </Modal.Content>

                    <Modal.Content>
                        {this.state.searching ?
                            <MovieResults
                                searchResults={this.state.searchResults}
                                addNewMovie={this.props.addNewMovie}
                                toggleAddMovie={this.props.toggleAddMovie}
                                resetSearch={this.resetSearch}
                                userId={this.props.userId}
                                handleClose={this.handleClose}
                            /> :
                            null
                        }
                    </Modal.Content>
                </Modal>

            </div>
        )
    }
}
