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

    render() {
        return (
            <div>

            </div>
        )
    }
}
