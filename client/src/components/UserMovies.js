import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, Button, Modal } from 'semantic-ui-react'
import AddMovie from './AddMovie';


export default class UserMovies extends Component {
    state = {
        user: {},
        movies: [],
        addMovie: false
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

    toggleAddMovie = () => {
        this.setState({ addMovie: !this.state.addMovie })
    }

    render() {
        const user = this.state.user
        const movieList = this.state.movies.map((movie, i) => {
            return (
                <Link to={`/users/${user.id}/movies/${movie.id}`}>
                    <Card key={i}>
                        <Card.Content> Title: {movie.title} </Card.Content>
                        <Card.Content> Release Date: {movie.release_date} </Card.Content>
                        <Card.Content>Overview: {movie.overview} </Card.Content>
                    </Card>
                </Link>
            )
        })
        return (
            <div>
                <h1>{user.name}'s Movies<Button onClick={this.toggleAddMovie}>(+)</Button></h1>
                {this.state.addMovie ?
                <AddMovie /> : '' }
                <div>
                    {movieList}
                </div>
            </div>
        )
    }
}
