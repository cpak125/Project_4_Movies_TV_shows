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

export default class SingleTVShow extends Component {
    state = {
        user: {},
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
        const user = this.state.user
        const tvShow = this.state.tvShow
        const tvShowDetails = this.state.tvShowDetails
        const genres = tvShowDetails.genres
        const networks = tvShowDetails.networks
        const genreNames = genres.map(genre => genre.name)
        const networkNames = networks.map(network => network.name)
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
                        <Icon link name='user' /> {user.name}'s Profile
                     </Menu.Item>

                    <Menu.Item as={Link} to={`/users/${userId}/tv_shows`}>
                        <Icon link name='tv' /> {user.name}'s TV Shows
                     </Menu.Item>
                    <Menu.Item as={Link} to={`/users/${userId}/movies`}>
                        <Icon link name='film' />{user.name}'s Movies
                     </Menu.Item>
                </StyledMenu>

                <StyledCard centered>
                    <StyledHeader textAlign='center'> {tvShow.name}</StyledHeader>

                    <Card.Content textAlign='center'>
                        <Image rounded src={tvShow.poster_path} alt='show poster' />
                    </Card.Content>
                    <StyledContent>
                        <Card.Description style={{ color: '#02c39a' }}><b>GENRE(S):</b> {genreNames.toString()}</Card.Description>
                        <Card.Description style={{ color: '#02c39a' }}><b>OVERVIEW:</b> {tvShow.overview}</Card.Description>
                        <Card.Description style={{ color: '#02c39a' }}><b>NETWORK(S):</b> {networkNames.toString()}</Card.Description>
                        <Card.Description style={{ color: '#02c39a' }}><b>FIRST AIR DATE:</b> {tvShow.first_air_date} </Card.Description>
                        <Card.Description style={{ color: '#02c39a' }}><b>TOTAL SEASONS:</b> {tvShowDetails.number_of_seasons}</Card.Description>
                        <Card.Description style={{ color: '#02c39a' }}><b>TOTAL EPISODES:</b> {tvShowDetails.number_of_episodes}</Card.Description>
                        <Card.Description style={{ color: '#02c39a' }}><b>STATUS:</b> {tvShowDetails.status}</Card.Description>

                        <Button floated='right' color='red' onClick={this.showConfirm}>Delete TV Show</Button>
                        <Confirm
                            open={this.state.confirmOpen}
                            content={`Are you sure you want to delete '${tvShow.name}' ? `}
                            cancelButton='No'
                            confirmButton="Yes"
                            size='tiny'
                            onCancel={this.handleCancel}
                            onConfirm={() => this.deleteTvShow(tvShow.id)} />
                    </StyledContent>

                </StyledCard>
            </Page>
        )
    }
}
