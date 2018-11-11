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

export default class SingleTVShow extends Component {
    state = {
        user:{},
        tvShow: {},
        tvShowDetails: {
            genres: [],
            networks: []
        },
        confirmOpen: false
    }

    async componentDidMount() {
        const userResponse = await this.fetchUser()
        const tvShowResponse = await this.fetchTvShowData()
        const tvShowDetailsResponse = await this.fetchTvShowDetails(tvShowResponse.data.tv_id)
        this.setState({
            user: userResponse.data,
            tvShow: tvShowResponse.data,
            tvShowDetails: tvShowDetailsResponse.data
        })
    }

    fetchUser = async () => {
        const userId = this.props.match.params.user_id
        return await axios.get(`/api/users/${userId}`)
    }

    fetchTvShowData = async () => {
        const userId = this.props.match.params.user_id
        const tvId = this.props.match.params.id
        return await axios.get(`/api/users/${userId}/tv_shows/${tvId}`)
    }

    fetchTvShowDetails = async (tv_id) => {
        return await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}?api_key=${process.env.REACT_APP_API_KEY}`)
    }

    deleteTvShow = async (tvShowId) => {
        const userId = this.props.match.params.user_id
        await axios.delete(`/api/users/${userId}/tv_shows/${tvShowId}`)
        this.props.history.push(`/users/${userId}/tv_shows`)

    }

    showConfirm = () => this.setState({ confirmOpen: true })

    handleConfirm = () => this.setState({ confirmOpen: false })

    handleCancel = () => this.setState({ confirmOpen: false })

    render() {
        const user=this.state.user
        const tvShow = this.state.tvShow
        const tvShowDetails = this.state.tvShowDetails
        const genres = tvShowDetails.genres
        const networks = tvShowDetails.networks
        const genreNames = genres.map(genre => genre.name)
        const networkNames = networks.map(network => network.name)
        const userId = this.props.match.params.user_id

        return (
            <div>
                <Menu fluid widths={5} size='tiny' icon='labeled' inverted>
                    <Menu.Item as={Link} to='/'>
                        <Icon link name='home' /> Home
                    </Menu.Item>

                    <Menu.Item as={Link} to='/users'>
                        <Icon link name='users' /> All Users
                    </Menu.Item>

                    <Menu.Item as={Link} to={`/users/${userId}`}>
                        <Icon link name='user' /> User's Profile
                     </Menu.Item>

                    <Menu.Item as={Link} to={`/users/${userId}/tv_shows`}>
                        <Icon link name='tv' /> {user.name}'s TV Shows
                     </Menu.Item>
                     <Menu.Item as={Link} to={`/users/${userId}/movies`}>
                        <Icon link name='film' />{user.name}'s Movies
                     </Menu.Item>
                </Menu>

                <div><img src={tvShow.poster_path} alt='show poster' /></div>
                <p><b>Name:</b> {tvShow.name}</p>
                <p><b>Genre(s):</b> {genreNames.toString()}</p>
                <p><b>Overview:</b> {tvShow.overview}</p>
                <p><b>Network(s):</b> {networkNames.toString()}</p>
                <p><b>First Air Date:</b> {tvShow.first_air_date} </p>
                <p><b>Total Seasons:</b> {tvShowDetails.number_of_seasons}</p>
                <p><b>Total Episodes:</b> {tvShowDetails.number_of_episodes}</p>
                <p><b>Status:</b> {tvShowDetails.status}</p>


                <button onClick={() => this.deleteTvShow(tvShow.id)}>Delete TV Show</button>
            </div>
        )
    }
}
