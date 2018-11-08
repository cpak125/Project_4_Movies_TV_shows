import React, { Component } from 'react'
import axios from 'axios'

export default class SingleTVShow extends Component {
    state = {
        tvShow: {},
        tvShowDetails: {
            genres: [],
            networks: []
        }
    }

    async componentDidMount() {
        const tvShowResponse = await this.fetchTvShowData()
        const tvShowDetailsResponse = await this.fetchTvShowDetails(tvShowResponse.data.tv_id)
        this.setState({
            tvShow: tvShowResponse.data,
            tvShowDetails: tvShowDetailsResponse.data
        })
    }

    fetchTvShowData = async () => {
        const userId = this.props.match.params.user_id
        const tvId = this.props.match.params.id
        return await axios.get(`/api/users/${userId}/tv_shows/${tvId}`)
    }

    fetchTvShowDetails = async (tv_id) => {
        return await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}?api_key=0832ef538fd529b929aeda8e57b1c0ed`)
    }

    deleteTvShow = async(tvShowId) => {
        const userId = this.props.match.params.user_id
        await axios.delete(`/api/users/${userId}/tv_shows/${tvShowId}`)
        this.props.history.push(`/users/${userId}/tv_shows`)
        
    }


    render() {
        const tvShow = this.state.tvShow
        const tvShowDetails = this.state.tvShowDetails
        const genres = tvShowDetails.genres
        const networks = tvShowDetails.networks

        const genreNames = genres.map(genre => genre.name)
        const networkNames = networks.map(network => network.name)


        return (
            <div>
                <div><img src={tvShow.poster_path} alt='show poster' /></div>
                <p><b>Name:</b> {tvShow.name}</p>
                <p><b>Genre(s):</b>{genreNames.toString()}</p>
                <p><b>Network(s):</b>{networkNames.toString()}</p>
                <p><b>First Air Date:</b> {tvShow.first_air_date} </p>
                <p><b>Overview:</b> {tvShow.overview}</p>
                <button onClick={() => this.deleteTvShow(tvShow.id)}>Delete TV Show</button>
            </div>
        )
    }
}
