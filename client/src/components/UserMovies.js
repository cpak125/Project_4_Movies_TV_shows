import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Card, Image, Menu, Icon, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import AddMovie from './AddMovie';

const StyledGrid = styled(Grid)`
    &&&{
        margin:3vw 3vw ;
    }
`
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
const StyledHeader = styled.div`
text-align:center;
margin-top: 5vw;
color:#d8e4ff;
h1{
    font-family:'Permanent Marker', cursive;
    font-size:40px;
}
 `

const StyledHeaderCard = styled(Card.Header)`
 &&&{
   font-size:20px;
   font-family: 'Cinzel', serif;
   color:#02c39a;
   font-weight:1000;
   margin:10px 0 10px 0;
   position:relative;
 }
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
                <Grid.Column key={i}>
                    <Card link style={{ background: '#00120b' }} as={Link} to={`/users/${user.id}/movies/${movie.id}`} >
                        <StyledHeaderCard textAlign='center'>{movie.title}</StyledHeaderCard>
                        <Image rounded style={{ height: '20vw' }} src={movie.poster_path} alt='movie poster' />
                    </Card>
                </Grid.Column>
            )
        })
        return (
            
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

                        <Menu.Item as={Link} to={`/users/${user.id}/tv_shows`}>
                            <Icon link name='tv' /> {user.name}'s TV Shows
                    </Menu.Item>
                    </StyledMenu>

                    <StyledHeader>
                        <h1>{user.name}'s Movies</h1>
                        <AddMovie addNewMovie={this.addNewMovie} />
                    </StyledHeader>

                    <StyledGrid columns={4} relaxed doubling>
                        {movieList.reverse()}
                    </StyledGrid>
                </Page>
           
        )
    }
}
