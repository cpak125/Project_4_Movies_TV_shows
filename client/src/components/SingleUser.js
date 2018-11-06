import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Card } from 'semantic-ui-react'

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
        /* display:flex;
        flex-direction:column;
        align-items: center; */
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
        user: {}
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

    render() {
        const user = this.state.user
        return (

            <Page>
                <h1>{user.name}'s Profile</h1>
                <StyledCard>
                    <StyledCardContent>
                        <Card.Description><b>Name:</b> {user.name}</Card.Description>
                        <Card.Description><b>Age:</b> {user.age}</Card.Description>
                        <Card.Description> <b>Location:</b> {user.location}</Card.Description>
                    </StyledCardContent>
                </StyledCard>
            </Page>
        )
    }
}
