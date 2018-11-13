import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Card, Image, Button, Menu, Icon, Confirm } from 'semantic-ui-react';

const Page = styled.div`
    background:url('https://i.imgur.com/oMvEDbI.png');
    background-color:black;
    margin:0 auto;
    height:100%;
`
const StyledMenu = styled(Menu)`
 &&&{
    font-family: 'Trade Winds', cursive;
 }
 `

const StyledCard = styled(Card)`
&&&{
    width:60vw;
    margin-top:5vw;
    margin-bottom:5vw;
    font-family: 'Ubuntu Mono', monospace;
    background-color:#00120b;
    font-size:18px;
    position:relative;
}
`
const StyledHeader = styled(Card.Header)`
&&&{
  font-size:40px;
  font-family: 'Cinzel', serif;
  color:#02c39a;
  margin-top:20px;
}
`

const StyledContent = styled(Card.Content)`
&&&{
    margin-bottom:1vw;
    padding-top: 3vw;
    line-height: 2;
}
`

export default class SingleMovie extends Component {
    state = {
        user: {},
        movie: {},
        movieDetails: {
            genres: []
        },
        confirmOpen: false
    }

    async componentDidMount() {
        const userResponse = await this.fetchUser()
        const movieResponse = await this.fetchMovieData()
        const movieDetailsResponse = await this.fetchMovieDetails(movieResponse.data.movie_id)

        this.setState({
            user: userResponse.data,
            movie: movieResponse.data,
            movieDetails: movieDetailsResponse.data
        })
    }

    fetchUser = async () => {
        const userId = this.props.match.params.user_id
        return await axios.get(`/api/users/${userId}`)
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
        const user = this.state.user
        const movie = this.state.movie
        const movieDetails = this.state.movieDetails
        const genres = movieDetails.genres
        const genreNames = genres.map(genre => genre.name)
        const userId = this.props.match.params.user_id

        return (
            <Page>
                <StyledMenu fluid widths={5} size='tiny' icon='labeled' inverted>
                    <Menu.Item as={Link} to='/'>
                        <Icon link name='home' /> Home
                    </Menu.Item>

                    <Menu.Item as={Link} to='/users'>
                        <Icon link name='users' /> All Users
                    </Menu.Item>

                    <Menu.Item as={Link} to={`/users/${userId}`}>
                        <Icon link name='user' />{user.name}'s Profile
                     </Menu.Item>

                    <Menu.Item as={Link} to={`/users/${userId}/movies`}>
                        <Icon link name='film' />{user.name}'s' Movies
                     </Menu.Item>
                    <Menu.Item as={Link} to={`/users/${userId}/tv_shows`}>
                        <Icon link name='tv' />{user.name}'s TV Shows
                     </Menu.Item>
                </StyledMenu>

                <StyledCard centered>
                    <StyledHeader textAlign='center'>{movie.title}</StyledHeader>
                  
                    <Card.Content textAlign='center'>
                        <Image rounded src={movie.poster_path} alt='movie poster' />
                    </Card.Content>
                    <StyledContent >
                        <Card.Description style={{color:'#02c39a'}}><b>GENRE(S):</b>{genreNames.toString()}</Card.Description>
                        <Card.Description style={{color:'#02c39a'}}><b>RELEASE DATE:</b> {movie.release_date} </Card.Description>
                        <Card.Description style={{color:'#02c39a'}}><b>OVERVIEW:</b> {movie.overview}</Card.Description>
                        <Button floated='right' color='red' onClick={this.showConfirm}>Delete Movie</Button>
                        <Confirm
                            open={this.state.confirmOpen}
                            content={`Are you sure you want to delete '${movie.title}' ? `}
                            cancelButton='No'
                            confirmButton="Yes"
                            size='tiny'
                            onCancel={this.handleCancel}
                            onConfirm={() => this.deleteMovie(movie.id)} />
                    </StyledContent>
                        
                </StyledCard>
            </Page>
        )
    }
}
