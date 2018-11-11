import React, { Component } from 'react'
import MovieResults from './MovieResults';
import axios from 'axios'
import { Modal, Button, Input, Search, Sticky } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledAddButton = styled(Button)`
&&&{
    width:30vw;
}
`
const StyledSearchButton = styled(Button)`
&&&{
    margin-top:2vw;
}
`

export default class AddMovie extends Component {
    state = {
        // searching: false,
        searchQuery: '',
        searchResults: [],
        modalOpen: false
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({
        modalOpen: false,
        searchQuery: '',
        searchResults: [],
        searching: false
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
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${this.state.searchQuery}&api_key=${process.env.REACT_APP_API_KEY}`)
        this.transferResult(response)
        this.toggleSearching()
    }

    newSearchHandler = () => {
        this.resetSearch()
    }


    // resetSearch = () => {
    //     this.setState({
    //         searchQuery: '',
    //         searchResults: [],
    //         searching: !this.state.searching
    //     })

    // }

    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            this.searchButtonHandler()
        }
    }

    render() {

        return (
            <div>
                <Modal
                    trigger={<StyledAddButton animated='fade' primary size='large' compact onClick={this.handleOpen} >
                        <Button.Content visible>Add a Movie</Button.Content>
                        <Button.Content hidden> Click to begin Search</Button.Content>
                    </StyledAddButton>}
                    size='large'
                    closeIcon
                    centered={false}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                >
                    <Modal.Header>Search for a Movie</Modal.Header>
                    <Modal.Content scrolling >
                        <Sticky offset={2}>
                            <Input fluid focus type='text' icon='search' 
                                placeholder="Search..."
                                value={this.state.searchQuery}
                                onChange={this.inputChangeHandler}
                                onKeyPress={this.handleKeyPress} />

                            {/* {this.state.searching ? */}
                                {/* <StyledSearchButton primary floated='right' onClick={this.newSearchHandler} >New Search</StyledSearchButton> : */}
                                <StyledSearchButton primary floated='right' onClick={this.searchButtonHandler}>Search</StyledSearchButton>

                            {/* } */}
                        </Sticky>

                        {this.state.searching ?
                            <MovieResults
                                searchResults={this.state.searchResults}
                                addNewMovie={this.props.addNewMovie}
                                resetSearch={this.resetSearch}
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
