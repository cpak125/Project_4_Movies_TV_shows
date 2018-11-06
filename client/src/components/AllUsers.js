import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'


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

    addNewUser = async()=>{
        
    }

    render() {
        const userList = this.state.users.map((user, i) => {
            return (
                <div key={i}>
                    {user.name}
                </div>
            )
        })

        return (
            <div>
                <h1>All Users</h1>
                
                <div>
                    {userList}
                </div>

            </div>
        )
    }
}
