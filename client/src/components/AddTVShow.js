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
        searchQuery: '',
        searchResults: [],
        modalOpen: false
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({
        modalOpen: false,
        searchQuery: '',
        searchResults: [],
    })

    transferResult = (response) => {
        this.setState({ searchResults: response.data.results })
    }

    inputChangeHandler = (event) => {
        this.setState({ searchQuery: event.target.value })
    }

    searchButtonHandler = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${this.state.searchQuery}&api_key=${process.env.REACT_APP_API_KEY}`)
        this.transferResult(response)
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
                    centered={false}
                    open={this.state.modalOpen}
                    onClose={this.handleClose} >

                    <Modal.Content>
                        <Sticky offset={2}>
                            <Input size='small' fluid focus type='text' placeholder="Search for a TV Show..." icon='search'
                                value={this.state.searchQuery} onChange={this.inputChangeHandler}
                                onKeyPress={this.handleKeyPress} />

                            <StyledSearchButton size='small' primary floated='right' onClick={this.searchButtonHandler}>Search</StyledSearchButton>
                        </Sticky>
                    </Modal.Content>

                    <Modal.Content scrolling>
                        <TVShowResults
                            searchResults={this.state.searchResults}
                            addNewTVShow={this.props.addNewTVShow}
                            handleClose={this.handleClose} />
                    </Modal.Content>
                </Modal>
            </div >
        )
    }
}
