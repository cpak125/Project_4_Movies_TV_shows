import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Button } from 'semantic-ui-react'

const Page = styled.div`
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

const StyledCardContent=styled(Card.Content)`
&&&{
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    align-items:left;
    font-size: 20px;
}
`
export default class SingleUser extends Component {
    state = {
        user: {},
        redirect: false
    }

    fetchData = async () => {
        const userId = this.props.match.params.id
        const responseUser = await axios.get(`/api/users/${userId}`)
        this.setState({
            user: responseUser.data
        })
    }

    async componentDidMount() {
        this.fetchData()
    }

    deleteUser= async ()=>{
        const userId= this.props.match.params.id
        await axios.delete(`/api/users/${userId}`)
        this.setState({ redirect: true })

    }

    render() {
        if (this.state.redirect){
            return <Redirect to='/users' />
        }
        const user = this.state.user
        return (

            <Page>
                <h1>{user.name}'s Profile</h1>
                <StyledCard>
                    <StyledCardContent>
                        <Card.Description><b>Name:</b> {user.name}</Card.Description>
                        <Card.Description><b>Age:</b> {user.age}</Card.Description>
                        <Card.Description> <b>Location:</b> {user.location}</Card.Description>
                        <Button onClick={()=> this.deleteUser()}>Delete</Button>
                    </StyledCardContent>
                </StyledCard>
            </Page>
        )
    }
}
