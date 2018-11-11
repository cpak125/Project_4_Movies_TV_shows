import React, { Component } from 'react'
import TVShowResults from './TVShowResults';
import axios from 'axios'
import styled from 'styled-components'
import { Modal, Button, Input, Sticky } from 'semantic-ui-react'

const StyledAddButton = styled(Button)`
&&&{
    width:30vw;
}
`
const StyledSearchButton = styled(Button)`
&&&{
    margin-top:1vw;
}
`

export default class AddTVShow extends Component {
    state = {
        searching: false,
        searchQuery: '',
        searchResults: [],
        modalOpen: false
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({
        modalOpen: false,
        searchQuery: '',
        searchResults: [],
        searching: !this.state.searching
    })

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

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.searchButtonHandler()
        }
    }

    render() {
        return (
            <div>
                <Modal trigger={
                    <StyledAddButton animated='fade' primary size='large' compact onClick={this.handleOpen} >
                        <Button.Content visible>Add a TV Show</Button.Content>
                        <Button.Content hidden> Click to begin Search</Button.Content>
                    </StyledAddButton>}
                    size='large'
                    closeIcon
                    centered
                    open={this.state.modalOpen}
                    onClose={this.handleClose} >

                    <Modal.Header>Search for a Movie</Modal.Header>
                    <Modal.Content>
                        <Sticky>
                            <Input size='small' fluid focus type='text' placeholder="Search..." icon='search'
                                value={this.state.searchQuery} onChange={this.inputChangeHandler}
                                onChange={this.inputChangeHandler}
                                onKeyPress={this.handleKeyPress} />

                            {this.state.searching ?
                                <StyledSearchButton size='small' primary floated='right' onClick={this.newSearchHandler} >New Search</StyledSearchButton> :
                                <StyledSearchButton size='small' primary floated='right' onClick={this.searchButtonHandler}>Search</StyledSearchButton>
                            }
                        </Sticky>
                    </Modal.Content>

                    <Modal.Content scrolling>
                        {this.state.searching ?
                            <TVShowResults
                                searchResults={this.state.searchResults}
                                addNewTVShow={this.props.addNewTVShow}
                                resetSearch={this.resetSearch}
                                handleClose={this.handleClose}
                            /> : null}
                    </Modal.Content>
                </Modal>
            </div >
        )
    }
}
