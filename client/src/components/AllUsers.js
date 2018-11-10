import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewUserForm from './NewUserForm';
import { Icon, Menu } from 'semantic-ui-react';

const Page = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 padding-top:40px;
 `

const UserListContainer = styled.div`
 font-size: 20px;
 display:flex;
 flex-direction: column;
 align-content: space-between;
 justify-content:space-between;
 align-items: center;
 padding-top:30px;
 `

const StyledUser = styled.div`
 padding-top:10px;
 padding-bottom:10px;
 `

const StyledIcon = styled(Icon)`
&&& {
    padding-left: 10px; 
    padding-top: 10px;  
}
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
                <Menu icon='labeled' inverted>
                    <Menu.Item as={Link} to='/'>
                        <Icon size='large' link name='home' /> Home
                    </Menu.Item>
                </Menu>
                <Page>
                    <h1>Users <NewUserForm
                        addNewUser={this.addNewUser}
                    />
                    </h1>
                </Page>


                <UserListContainer>
                    {userList}
                </UserListContainer>
            </div>



        )
    }
}
