import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Button } from 'semantic-ui-react'
import EditUserForm from './EditUserForm';

const ProfileSection = styled.div`
    padding-top: 20px;
    margin: auto;
    display:flex;
    flex-direction: column;
    align-items: center;
`

const StyledCard = styled(Card)`
    &&&{
        width: 30vw;
        height: 300px;
    }
`

const StyledCardContent = styled(Card.Content)`
&&&{
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    align-items:left;
    font-size: 18px;
}
`
export default class SingleUser extends Component {
    state = {
        user: {},
        redirect: false
    }

    async componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        const userId = this.props.match.params.id
        const responseUser = await axios.get(`/api/users/${userId}`)
        this.setState({
            user: responseUser.data
        })
    }

    deleteUser = async () => {
        const userId = this.props.match.params.id
        await axios.delete(`/api/users/${userId}`)
        this.setState({ redirect: true })

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/users' />
        }
        const user = this.state.user
        return (
            <div>
                <ProfileSection>
                    <h1>{user.name}'s Profile</h1>
                    <StyledCard>
                        <StyledCardContent>

                            <Card.Description><b>Name:</b> {user.name}</Card.Description>
                            <Card.Description><b>Age:</b> {user.age}</Card.Description>
                            <Card.Description> <b>Location:</b> {user.location}</Card.Description>

                            <Card.Content extra>
                                <EditUserForm
                                    userId={this.props.match.params.id}
                                    push={this.props.history.push}
                                    fetchData={this.fetchData()}

                                />
                            </Card.Content>

                            <Card.Content extra>
                                <Button fluid color='red' onClick={() => this.deleteUser()}>Delete</Button>
                            </Card.Content>

                        </StyledCardContent>
                    </StyledCard>
                </ProfileSection>

                <Link to={`/users/${user.id}/movies`}><Button>Movies</Button></Link>
                <Link to={`/user/${user.id}/tv_shows`}><Button>TV Shows</Button></Link>
                
            </div>

        )
    }
}
