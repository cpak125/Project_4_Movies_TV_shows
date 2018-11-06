import React, { Component } from 'react'
import { Form, Button, Modal, Input } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledForm = styled(Form)`
    &&& {
        width: 30vw; 
        margin: auto;  
    }
`
const StyledModal = styled(Modal)`
    &&& {
        width: 50vw;
        margin:auto;
    }
`

export default class NewUserForm extends Component {
    state = {
        newUser: {
            name: '',
            age: '',
            location: ''
        },
        modalOpen: false
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleChange = (event) => {
        const newUser = { ...this.state.newUser }
        newUser[event.target.name] = event.target.value
        this.setState({ newUser })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const newUser = { ...this.state.newUser }
        this.props.addNewUser(newUser)
        this.setState({
            newUser: {
                name: '',
                age: '',
                location: ''
            }
        })
        this.setState({ modalOpen: false })
    }

    addNewUserModal = () => (
        <StyledModal trigger={<Button onClick={this.handleOpen}>(+)</Button>}
            open={this.state.modalOpen} 
        >
            <Modal.Content form="true">
                <StyledForm onSubmit={this.handleSubmit}>
                    <Form.Field inline>
                        <label>Name:</label>
                        <Input fluid onChange={this.handleChange} type="text" name="name" value={this.state.newUser.name} placeholder='Name' />
                    </Form.Field>
                    <Form.Field inline>
                    <label>Age:  </label>
                    <Input fluid onChange={this.handleChange} type="text" name="age" value={this.state.newUser.age} placeholder='Age' />
                    </Form.Field>
                    <Form.Field inline>
                    <label>Location:</label>
                    <Input fluid onChange={this.handleChange} type="text" name="location" value={this.state.newUser.location} placeholder='City, State' />
                    </Form.Field>
                    <Button className='update' type='submit' value='Add Post'>Submit</Button>
                </StyledForm>
            </Modal.Content>
        </StyledModal>
    )

    render() {
        return (

            this.addNewUserModal()
        )
    }
}
