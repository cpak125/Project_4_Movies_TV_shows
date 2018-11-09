import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, Button } from 'semantic-ui-react'
import AddMovie from './AddMovie';


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
                    <Card >
                        <Card.Content> Title: {movie.title} </Card.Content>
                        <Card.Content><img src={movie.poster_path} alt='movie poster' /> </Card.Content>
                    </Card>
                </Link>
            )
        })
        return (
            <div>
                <h1>{user.name}'s Movies</h1>

                <AddMovie
                    addNewMovie={this.addNewMovie}
                    userId={this.props.match.params.user_id}
                    
                />

                <div>
                    {movieList}
                </div>
            </div>
        )
    }
}
