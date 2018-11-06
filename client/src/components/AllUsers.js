import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewUserForm from './NewUserForm';


export default class AllUsers extends Component {

    state = {
        users: []
    }

    async componentDidMount() {
        await this.fetchUsers()
    }

    fetchUsers = async () => {
        const response = await axios.get('/api/users')
        this.setState({ users: response.data })
    }

    addNewUser = async (newUser) => {
        await axios.post('/api/users', newUser)
        this.fetchUsers()
    }

    render() {
        const userList = this.state.users.map((user, i) => {
            return (
                <div key={i}>
                    <Link to={`/users/${user.id}`}>{user.name} </Link>
                </div>
            )
        })

        return (
            <div>
                <h1>All Users<NewUserForm
                    addNewUser={this.addNewUser}
                />
                </h1>

                <div>
                    {userList}
                </div>

            </div>
        )
    }
}
