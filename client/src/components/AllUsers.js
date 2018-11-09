import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewUserForm from './NewUserForm';

const Page = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 `

const UserListContainer = styled.div`
 font-size: 20px;
 display:flex;
 flex-direction: column;
 align-content: space-between;
 justify-content:space-between;
 align-items: center;
 padding-top:20px;
 `

const StyledUser = styled.div`
 padding-top:10px;
 padding-bottom:10px;
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
