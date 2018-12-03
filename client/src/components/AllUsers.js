import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import NewUserForm from './NewUserForm';
import { Icon, Menu } from 'semantic-ui-react';

const Body = styled.div`
    text-align:center;
    margin-top:20px;
    display:flex;
    flex-direction:column;
    line-height:2;
    font-family: 'Permanent Marker', cursive;
    font-size:25px;
    color:#02c39a;
 h1{
    color:#d8e4ff;
    font-size:40px;
    font-family: 'Permanent Marker', cursive;
 }
 `
const StyledMenu = styled(Menu)`
 &&&{
    font-family: 'Trade Winds', cursive;
 }
 `
 
const Page = styled.div`
    background-image:url('https://i.imgur.com/oMvEDbI.png');
    height:100vh;
    background-color:black;
    margin:0 auto;
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
                <Link style={{color:'#02c39a'}} key={i} to={`/users/${user.id}`} >{user.name} </Link>
            )
        })

        return (
            <Page>
                <StyledMenu style={{}} size='tiny' icon='labeled' inverted>
                    <Menu.Item as={Link} to='/'>
                        <Icon link name='home' /> Home
                    </Menu.Item>
                </StyledMenu>

                <Body>
                    <h1>Users <NewUserForm
                        addNewUser={this.addNewUser}
                    />
                    </h1>
                        {userList}
                </Body>

            </Page>



        )
    }
}
