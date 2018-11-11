import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewUserForm from './NewUserForm';
import { Icon, Menu } from 'semantic-ui-react';

const Body = styled.div`
 text-align:center;
 margin-top:20px;
 `

const StyledUser = styled.div`
 margin-top:10px;
 margin-bottom:10px;
 font-size:20px;
 `

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
                <StyledUser key={i}>
                    <Link to={`/users/${user.id}`} >{user.name} </Link>
                </StyledUser>
            )
        })

        return (
            <div>
                <Menu size='tiny' icon='labeled' inverted>
                    <Menu.Item as={Link} to='/'>
                        <Icon link name='home' /> Home
                    </Menu.Item>
                </Menu>

                <Body>
                    <h1>Users <NewUserForm
                        addNewUser={this.addNewUser}
                    />
                    </h1>

                    {userList}
                </Body>

            </div>



        )
    }
}
