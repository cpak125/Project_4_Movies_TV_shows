import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, Image, Menu, Icon, Grid } from 'semantic-ui-react'
import AddTVShow from './AddTVShow';
import styled from 'styled-components'


const StyledGrid = styled(Grid)`
    &&&{
        margin:3vw 3vw ;
    }
`

const StyledHeader = styled.div`
text-align:center;
margin-top: 5vw;
color:#d8e4ff;
h1{
    font-family:'Permanent Marker', cursive;
    font-size:40px;
}
 `
const Page = styled.div`
    background:url('https://i.imgur.com/oMvEDbI.png');
    background-color:black;
    margin:0 auto;
    height:100vw;
`
const StyledMenu = styled(Menu)`
 &&&{
    font-family: 'Trade Winds', cursive;
 }
 `

const StyledHeaderCard = styled(Card.Header)`
&&&{
  font-size:25px;
  font-family: 'Cinzel', serif;
  text-align:center;
  color:#02c39a;
  font-weight:1000;
  margin:7px 0 7px 0;
}
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
                <Grid.Column key={i} >
                    <Card style={{ background: '#00120b' }} raised link as={Link} to={`/users/${user.id}/tv_shows/${tvShow.id}`} >
                        <StyledHeaderCard textAlign='center'>{tvShow.name} </StyledHeaderCard>
                        <Image rounded style={{ height: '25vw' }} fluid src={tvShow.poster_path} alt='show poster' />
                    </Card>
                </Grid.Column>
            )
        })

        return (
            <div>
                <Page>
                    <StyledMenu fluid widths={4} size='tiny' icon='labeled' inverted>
                        <Menu.Item as={Link} to='/'>
                            <Icon link name='home' /> Home
                    </Menu.Item>

                        <Menu.Item as={Link} to='/users'>
                            <Icon link name='users' /> All Users
                    </Menu.Item>

                        <Menu.Item as={Link} to={`/users/${user.id}`}>
                            <Icon link name='user' /> {user.name}'s Profile
                    </Menu.Item>

                        <Menu.Item as={Link} to={`/users/${user.id}/movies`}>
                            <Icon link name='film' /> {user.name}'s Movies
                    </Menu.Item>
                    </StyledMenu>

                    <StyledHeader>
                        <h1>{user.name}'s TV Shows</h1>
                        <AddTVShow addNewTVShow={this.addNewTVShow} />
                    </StyledHeader>

                    <StyledGrid columns={4} relaxed doubling>
                        {tvShowsList.reverse()}
                    </StyledGrid>
                </Page>
            </div>
        )
    }
}
