import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Button, Icon, Menu, Confirm } from 'semantic-ui-react'
import EditUserForm from './EditUserForm';

const ProfileSection = styled.div`
    padding-top: 20px;
    margin: auto;
    display:flex;
    flex-direction: column;
    align-items: center;
    Button{
        font-size: 40px;
    }

`

const Footer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    padding-top:40px;
    Button{
        width:30vw;
    }
`

const StyledCard = styled(Card)`
    &&&{
        width: 30vw;
        height: 300px;
        background-color:lightgray;
    }
`
const StyledCardContent = styled(Card.Content)`
&&&{
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    align-items:left;
    font-size: 18px;
    padding-bottom: 5px;
}
`

export default class SingleUser extends Component {
    state = {
        user: {},
        confirmOpen: false
    }

    async componentDidMount() {
        await this.fetchData()
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
        this.props.history.push(`/users`)
        this.handleConfirm()
    }

  showConfirm = () => this.setState({ confirmOpen: true })

  handleConfirm = () => this.setState({ confirmOpen: false })

  handleCancel = () => this.setState({ confirmOpen: false })


    render() {
        const user = this.state.user
        return (
            <div>
                <Menu size='small' icon='labeled' inverted>
                    <Menu.Item as={Link} to='/'>
                        <Icon link name='home' /> Home
                    </Menu.Item>
                    <Menu.Item as={Link} to='/users'>
                        <Icon link name='users' /> All Users
                    </Menu.Item>
                </Menu>

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
                                    fetchData={this.fetchData}
                                />
                            </Card.Content>

                            <Card.Content extra>
                                <Button
                                    fluid
                                    size='medium'
                                    color='red'
                                    onClick={this.showConfirm}>Delete Profile
                                </Button>
                                <Confirm
                                    open={this.state.confirmOpen}
                                    content={`Are you sure you want to delete ${user.name}'s profile? `}
                                    cancelButton='No'
                                    confirmButton="Yes"  
                                    size='tiny'                        
                                    onCancel={this.handleCancel}
                                    onConfirm={() => this.deleteUser()}  />

                            </Card.Content>

                        </StyledCardContent>
                    </StyledCard>
                </ProfileSection>

                <Footer>
                    <Link to={`/users/${user.id}/movies`}>
                        <Button size='big' color='green' animated='fade'>
                            <Button.Content visible>
                                <Icon name='film' size='big' />
                            </Button.Content>
                            <Button.Content hidden>
                                See Favorite Movies
                        </Button.Content>
                        </Button>
                    </Link>

                    <Link to={`/users/${user.id}/tv_shows`}>
                        <Button size='big' color='green' animated='fade'>
                            <Button.Content visible>
                                <Icon name='tv' size='big' />
                            </Button.Content>
                            <Button.Content hidden>
                                See Favorite TV Shows
                        </Button.Content>

                        </Button>
                    </Link>
                </Footer>

            </div>

        )
    }
}
