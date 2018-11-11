import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, Image, Menu, Icon, Grid } from 'semantic-ui-react'
import AddTVShow from './AddTVShow';
import styled from 'styled-components'


const StyledContainer = styled(Grid)`
    &&&{
        margin:3vw 3vw ;
    }
`

const StyledHeader = styled.div`
text-align:center;
margin-top: 5vw;
`

export default class UserTvShows extends Component {
    state = {
        user: {},
        tvShows: [],
        addTVShow: false,
        newTVShow: {
            name: '',
            tv_id: '',
            first_air_date: '',
            overview: '',
            poster_path: ''
        }
    }

    fetchData = async () => {
        const userId = this.props.match.params.user_id
        const responseUser = await axios.get(`/api/users/${userId}`)
        const responseTVShow = await axios.get(`/api/users/${userId}/tv_shows`)
        this.setState({
            user: responseUser.data,
            tvShows: responseTVShow.data
        })
    }

    async componentDidMount() {
        await this.fetchData()
    }

    toggleAddTVShow = () => {
        this.setState({ addTVShow: !this.state.addTVShow })
    }

    addNewTVShow = async (name, tv_id, first_air_date, overview, poster_path) => {
        const newTVShow = { ...this.state.newTVShow }
        newTVShow.name = name
        newTVShow.tv_id = tv_id
        newTVShow.first_air_date = first_air_date
        newTVShow.overview = overview
        newTVShow.poster_path = poster_path
        await this.setState({ newTVShow })
        this.handleSubmitTVShow()
    }

    handleSubmitTVShow = async () => {
        const userId = this.props.match.params.user_id
        await axios.post(`/api/users/${userId}/tv_shows`, this.state.newTVShow)
        await this.fetchData()
        this.setState({
            newTVShow: {
                name: '',
                tv_id: '',
                first_air_date: '',
                overview: '',
                poster_path: ''
            }
        })
    }

    render() {
        const user = this.state.user
        const tvShowsList = this.state.tvShows.map((tvShow, i) => {
            return (
                <Grid.Column>
                    <Card key={i} as={Link} to={`/users/${user.id}/tv_shows/${tvShow.id}`} >
                        <Card.Content> Name: {tvShow.name} </Card.Content>
                        <Card.Content><img src={tvShow.poster_path} alt='show poster' /> </Card.Content>
                    </Card>
                </Grid.Column>
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
                    <h1>{user.name}'s TV Shows</h1>
                    <AddTVShow addNewTVShow={this.addNewTVShow} />
                </StyledHeader>

                <StyledContainer columns={4} relaxed doubling>
                    {tvShowsList.reverse()}
                </StyledContainer>
            </div>
        )
    }
}
