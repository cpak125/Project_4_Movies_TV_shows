import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Card, Image, Menu, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import AddMovie from './AddMovie';

const StyledContainer = styled.div`
    
        margin:3vw 10vw ;
        display:flex;
`

const StyledHeader = styled.div`
text-align:center;
margin-top: 5vw;
`

export default class UserMovies extends Component {
    state = {
        user: {},
        movies: [],
        newMovie: {
            title: '',
            movie_id: '',
            release_date: '',
            overview: '',
            poster_path: ''
        }
    }

    fetchData = async () => {
        const userId = this.props.match.params.user_id
        const responseUser = await axios.get(`/api/users/${userId}`)
        const responseMovie = await axios.get(`/api/users/${userId}/movies`)
        this.setState({
            user: responseUser.data,
            movies: responseMovie.data
        })
    }

    async componentDidMount() {
        await this.fetchData()
    }

    addNewMovie = async (title, movie_id, release_date, overview, poster_path) => {
        const newMovie = { ...this.state.newMovie }
        newMovie.title = title
        newMovie.movie_id = movie_id
        newMovie.release_date = release_date
        newMovie.overview = overview
        newMovie.poster_path = poster_path
        await this.setState({ newMovie })
        this.handleSubmitMovie()
    }

    handleSubmitMovie = async () => {
        const userId = this.props.match.params.user_id
        await axios.post(`/api/users/${userId}/movies`, this.state.newMovie)
        await this.fetchData()
        this.setState({
            newMovie: {
                title: '',
                movie_id: '',
                release_date: '',
                overview: '',
                poster_path: '',
            }
        })
    }

    render() {

        const user = this.state.user
        const movieList = this.state.movies.map((movie, i) => {
            return (
                <Link key={i} to={`/users/${user.id}/movies/${movie.id}`}>
                    <Card>
                        <Card.Content >
                            <Card.Header textAlign='center'> {movie.title} </Card.Header>
                        </Card.Content>
                        <img src={movie.poster_path} alt='movie poster' />
                    </Card>
                </Link>
            )
        })
        return (
            <div>
                <Menu fluid widths={3} size='tiny' icon='labeled' inverted>
                    <Menu.Item as={Link} to='/'>
                        <Icon link name='home' /> Home
                    </Menu.Item>

                    <Menu.Item as={Link} to='/users'>
                        <Icon link name='users' /> All Users
                    </Menu.Item>

                    <Menu.Item as={Link} to={`/users/${user.id}`}>
                        <Icon link name='user' /> User
                    </Menu.Item>
                </Menu>

                <StyledHeader>
                    <h1>{user.name}'s Movies</h1>
                    <AddMovie addNewMovie={this.addNewMovie} />
                </StyledHeader>

                <StyledContainer doubling itemsPerRow={4}>
                    {movieList.reverse()}
                </StyledContainer>
            </div>

        )
    }
}
