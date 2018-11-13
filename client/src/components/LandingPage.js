import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Image } from 'semantic-ui-react';

const Page = styled.div`
background-image:url('https://i.imgur.com/NQk1Lcq.jpg');
height:100vh;
background-position: center ;
background-repeat: no-repeat;
background-size:cover;
background-attachment: fixed;
text-align:center;
display:flex;
flex-direction:column;
justify-content:flex-start;
overflow:hidden;
margin: 0 auto;
h1{
  color:#02C39A; 
  position:relative;
  font-family: 'Permanent Marker', cursive;
  font-size:80px;
  font-weight:bold;
  letter-spacing: 5px;
  margin: 0 auto;
}
p{
  color:#D8E4FF;
  background-color: rgba(0,0,0, .6);
  width:50%;
  font-size:18px;
  position:relative;
  margin: 0 auto;
  font-family: 'Permanent Marker', cursive;
  letter-spacing: 1px;
}
`
const StyledButton = styled(Button)`
&&&{
background-color:#02c39a;
color:#d8e4ff;
margin-top:10px;
}
`

const StyledLogo = styled(Image)`
&&&{
  width:8vw;
  height:15vh;
  float:right;
}
`
const StyledFooter = styled.div`
  background-color: rgba(0,0,0, .6);
  position:fixed;
  bottom: 0px;
  margin: 0 auto;
  width:100vw;
  p{
    font-size:12px;
    color:#02c39a;
    position:fixed;
    bottom:0px;
    margin-left:25vw;
  }
`

export default class LandingPage extends Component {
  render() {
    return (

      <Page>
        <h1>Watcher</h1>
        <p>Welcome to Watcher! This is an easy-to-use app that allows you to share your favorite movies and TV shows with people around the world. You can start off by creating your own personal profile and then search for movies and tv shows to add to your favorites list. Or you can view other peoples' favorite movies and tv shows by checking out their profile. Click "Enter" below to get started.  </p>
        <Link to='/users'><StyledButton>Enter</StyledButton></Link>
        <StyledFooter>
          <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
          <StyledLogo floated='right' src='https://www.themoviedb.org/assets/1/v4/logos/293x302-powered-by-square-green-3ee4814bb59d8260d51efdd7c124383540fc04ca27d23eaea3a8c87bfa0f388d.png' alt='TMDB logo'>
          </StyledLogo>
        </StyledFooter>
      </Page>
    )
  }
}
