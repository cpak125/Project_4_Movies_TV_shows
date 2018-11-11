import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Card, Image, Button, Menu, Icon, Confirm } from 'semantic-ui-react';

const StyledCard = styled(Card)`
&&&{
width:60vw;
margin-top:5vw;
margin-bottom:5vw;
background-color:gray;
}
`

const StyledContent = styled(Card.Content)`
&&&{
    margin-bottom:3vw;
    padding-top: 3vw;
    line-height: 30px;
}
`

export default class SingleMovie extends Component {
    state = {
        movie: {},
        movieDetails: {
            genres: []
        },
        confirmOpen: false
    }

    async componentDidMount() {
        const movieResponse = await this.fetchMovieData()
        const movieDetailsResponse = await this.fetchMovieDetails(movieResponse.data.movie_id)

        this.setState({
            movie: movieResponse.data,
            movieDetails: movieDetailsResponse.data
        })
    }

    fetchMovieData = async () => {
        const userId = this.props.match.params.user_id
        const movieId = this.props.match.params.id
        return await axios.get(`/api/users/${userId}/movies/${movieId}`)
    }

    fetchMovieDetails = async (movie_id) => {
        return await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}`)
    }

    deleteMovie = async (movieId) => {
        const userId = this.props.match.params.user_id
        await axios.delete(`/api/users/${userId}/movies/${movieId}`)
        this.props.history.push(`/users/${userId}/movies`)

    }

    showConfirm = () => this.setState({ confirmOpen: true })

    handleConfirm = () => this.setState({ confirmOpen: false })

    handleCancel = () => this.setState({ confirmOpen: false })


    render() {
        const movie = this.state.movie
        const movieDetails = this.state.movieDetails
        const genres = movieDetails.genres
        let genreNames = genres.map(genre => genre.name)
        const userId = this.props.match.params.user_id

        return (
            <div>
                <Menu fluid widths={4} size='tiny' icon='labeled' inverted>
                    <Menu.Item as={Link} to='/'>
                        <Icon link name='home' /> Home
                    </Menu.Item>

                    <Menu.Item as={Link} to='/users'>
                        <Icon link name='users' /> All Users
                    </Menu.Item>

                    <Menu.Item as={Link} to={`/users/${userId}`}>
                        <Icon link name='user' /> User
                     </Menu.Item>

                    <Menu.Item as={Link} to={`/users/${userId}/movies`}>
                        <Icon link name='film' /> Movies
                     </Menu.Item>

                </Menu>

                <StyledCard centered>
                    <Card.Content>
                        <Card.Header textAlign='center'>{movie.title}</Card.Header>
                    </Card.Content>
                    <Card.Content textAlign='center'>
                        <Image centered src={movie.poster_path} alt='movie poster' />
                    </Card.Content>
                    <StyledContent>
                        <Card.Description><b>Genre(s):</b>{genreNames.toString()}</Card.Description>
                        <Card.Description><b>Release Date:</b> {movie.release_date} </Card.Description>
                        <Card.Description><b>Overview:</b> {movie.overview}</Card.Description>
                    </StyledContent>

                    <Button fluid color='red' onClick={this.showConfirm}>Delete Movie</Button>
                    <Confirm
                        open={this.state.confirmOpen}
                        content={`Are you sure you want to delete '${movie.title}' ? `}
                        cancelButton='No'
                        confirmButton="Yes"
                        size='tiny'
                        onCancel={this.handleCancel}
                        onConfirm={() => this.deleteMovie(movie.id)} />

                </StyledCard>
            </div>
        )
    }
}
