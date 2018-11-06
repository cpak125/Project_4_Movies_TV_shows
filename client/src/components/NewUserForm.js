import React, { Component } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import styled from 'styled-components'


export default class NewUserForm extends Component {
    state = {
        newUser: {
            name: '',
            age: '',
            location: ''
        },
        modealOpen: false
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
                location:''
            }
        })
        this.setState({ modalOpen: false })
    }

    addNewUserModal = () => (
        <Modal trigger={<Button onClick={this.handleOpen}>(+)</Button>}
            open={this.state.modalOpen}
            >
            <Modal.Content form="true">
                <Form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" name="name" value={this.state.newUser.name} placeholder='Name' />
                    <input onChange={this.handleChange} type="text" name="age" value={this.state.newUser.age} placeholder='Age' />
                    <input onChange={this.handleChange} type="text" name="location" value={this.state.newUser.location} placeholder='City,State' />
                    <Button  className='update' type='submit' value='Add Post'>Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )

    render() {
        return (
           this.addNewUserModal()
        )
    }
}
