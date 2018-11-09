import React, { Component } from 'react'
import TVShowResults from './TVShowResults';
import axios from 'axios'
import { Modal, Button, Input } from 'semantic-ui-react'



export default class AddTVShow extends Component {
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
        const response = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${this.state.searchQuery}&api_key=${process.env.REACT_APP_API_KEY}`)
        this.transferResult(response)
        this.toggleSearching()
    }

    newSearchHandler = () => {
        this.resetSearch()
    }

    resetSearch = () => {
        this.setState({
            searchQuery: '',
            searchResults: [],
            searching: !this.state.searching
        })
    }


    render() {
        return (
            <div>
                <Modal trigger={<Button onClick={this.handleOpen} >Add a TV Show</Button>}
                    closeIcon
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                >
                    <Modal.Content>
                        <h1>Add TV Show</h1>

                        <Input focus placeholder="Search..." value={this.state.searchQuery} onChange={this.inputChangeHandler} />

                        {this.state.searching ?
                            <button onClick={this.newSearchHandler}>New Search</button> :
                            <button onClick={this.searchButtonHandler}>Search</button>
                        }

                        {this.state.searching ?
                            <TVShowResults
                                searchResults={this.state.searchResults}
                                addNewTVShow={this.props.addNewTVShow}
                                // toggleAddTVShow={this.props.toggleAddTVShow}
                                resetSearch={this.resetSearch}
                                // userId={this.props.userId}
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
