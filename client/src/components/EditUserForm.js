import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Modal, Input } from 'semantic-ui-react'
import styled from 'styled-components'


const StyledForm = styled(Form)`
    &&& {
        width: 30vw; 
        margin: auto;  
        font-size: 16px;
    }
`
const StyledModal = styled(Modal)`
    &&& {
        width: 50vw;
        margin:auto;
        padding-bottom: 10px;
    }
`


export default class EditUserForm extends Component {
    state = {
        user: {},
        modalOpen: false
    }

    componentDidMount = () => {
        this.getUser()
    }

    getUser = async () => {
        const userId = this.props.userId
        const response = await axios(`/api/users/${userId}`)
        this.setState({
            user: response.data
        })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => {
        this.setState({ modalOpen: false })
        this.getUser()
    }

  
    handleChange = (event) => {
        const updatedUser = { ...this.state.user }
        updatedUser[event.target.name] = event.target.value
        this.setState({ user: updatedUser })
    }

    handleUpdate = async (event) => {
        const userId = this.props.userId
        const updatedUser = this.state.user
        event.preventDefault()
        await axios.put(`/api/users/${userId}`, updatedUser)
        this.setState({ modalOpen: false })
        this.props.fetchData()

    }


    editUserModal = () => (
        <StyledModal trigger={<Button color='blue' fluid onClick={this.handleOpen}>Edit Profile</Button>}
            open={this.state.modalOpen}
        >
            <Modal.Content form="true">
                <StyledForm onSubmit={this.handleUpdate}>
                    <Form.Field inline>
                        <label>Name:</label>
                        <Input fluid onChange={this.handleChange} type="text" name="name" value={this.state.user.name} />
                    </Form.Field>
                    <Form.Field inline>
                        <label>Age:  </label>
                        <Input fluid onChange={this.handleChange} type="text" name="age" value={this.state.user.age} />
                    </Form.Field>
                    <Form.Field inline>
                        <label>Location:</label>
                        <Input fluid onChange={this.handleChange} type="text" name="location" value={this.state.user.location} />
                    </Form.Field>
                    <Button color='red' floated='right' onClick={this.handleClose}>Cancel</Button>
                    <Button color='green' floated='right' type='submit' value='Update'>Update</Button>
                </StyledForm>
            </Modal.Content>
        </StyledModal>
    )

    render() {

        return (
            this.editUserModal()
        )
    }
}
