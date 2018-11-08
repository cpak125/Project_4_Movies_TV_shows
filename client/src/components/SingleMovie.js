import React, { Component } from 'react'
import axios from 'axios'

export default class SingleMovie extends Component {
    state = {
        movie: {},
        movieDetails: {
            genres: []
        }
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
        return await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=0832ef538fd529b929aeda8e57b1c0ed`)
    }

    deleteMovie = async(movieId) => {
        const userId = this.props.match.params.user_id
        await axios.delete(`/api/users/${userId}/movies/${movieId}`)
        this.props.history.push(`/users/${userId}/movies`)
        
    }

    render() {
        const movie = this.state.movie
        const movieDetails = this.state.movieDetails
        const genres = movieDetails.genres
        console.log(genres)

        let genreNames = genres.map(genre => genre.name)

        return (
            <div>
                <div><img src={movie.poster_path} alt= 'movie poster' /></div>
                <p><b>Title:</b> {movie.title}</p>
                <p><b>Genre(s):</b>{genreNames.toString()}</p>
                <p><b>Release Date:</b> {movie.release_date} </p>
                <p><b>Overview:</b> {movie.overview}</p>
                <button onClick={()=> this.deleteMovie(movie.id)}>Delete Movie</button>
            </div>
        )
    }
}
