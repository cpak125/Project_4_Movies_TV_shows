import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, Button } from 'semantic-ui-react'
import AddTVShow from './AddTVShow';


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

    handleSubmitTVShow = async ()=> {
        const userId = this.props.match.params.user_id
        await axios.post(`/api/users/${userId}/tv_shows`, this.state.newTVShow)
        await this.fetchData()
        this.setState({newTVShow:{
            name: '',
            tv_id: '',
            first_air_date: '',
            overview: '',
            poster_path: ''
        }})

    }

    render() {
        const user = this.state.user
        const tvShowsList = this.state.tvShows.map((tvShow, i) => {
            return (
                <Link key={i} to={`/users/${user.id}/tv_shows/${tvShow.id}`}>
                    <Card >
                        <Card.Content> Name: {tvShow.name} </Card.Content>
                        <Card.Content> First Air Date: {tvShow.first_air_date} </Card.Content>
                        <Card.Content><img src={tvShow.poster_path} alt='show poster' /> </Card.Content>
                        {/* <Card.Content>Overview: {tvShow.overview} </Card.Content> */}
                    </Card>
                </Link>
            )
        })
        return (
            <div>
                <h1>{user.name}'s TV Shows<Button onClick={this.toggleAddTVShow}>(+)</Button></h1>
                {this.state.addMovie ?
                    <AddTVShow
                        toggleAddTVShow={this.toggleAddTVShow}
                        addnewTVShow={this.addnewTVShow}
                    /> : ''}
                <div>
                    {tvShowsList}
                </div>
            </div>
        )
    }
}
