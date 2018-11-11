import React, { Component } from 'react'
import axios from 'axios'
import { Card, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import AddMovie from './AddMovie';

const StyledContainer = styled(Card.Group)`
    &&&{
        margin:5vw 10vw ;
        /* display:flex;
        justify-content:space-around; */
    }
`

// const StyledCard = styled(Card)`
//     &&&{
//         max-width:75vw;
//     }
// `

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

                <Card fluid key={i} href={`/users/${user.id}/movies/${movie.id}`} >
                    <Card.Content >
                        <Card.Header textAlign='center'> {movie.title} </Card.Header>
                    </Card.Content>
                    <Image fluid src={movie.poster_path} alt='movie poster' />
                </Card>

            )
        })
        return (
            <div>
                <h1>{user.name}'s Movies</h1>

                <AddMovie addNewMovie={this.addNewMovie} />

                <StyledContainer stackable itemsPerRow={4}>
                    {movieList.reverse()}
                </StyledContainer>
            </div>

        )
    }
}
