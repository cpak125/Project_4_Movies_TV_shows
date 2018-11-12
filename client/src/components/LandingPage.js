import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Page=styled.div`
background-image:url('https://i.imgur.com/NQk1Lcq.jpg');
height:100vh;
background-position: center center;
background-repeat: no-repeat;
background-size: cover;
background-attachment: fixed;
text-align:center;
display:flex;
flex-direction:column;
justify-content:space-evenly;
`

export default class LandingPage extends Component {
  render() {
    return (
      <Page>
        <h1>Landing Page</h1>
        <p>App description</p>
        <Link to='/users'><button>Enter</button></Link>
      </Page>
    )
  }
}
