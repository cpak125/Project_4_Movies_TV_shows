import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <h1>Landing Page</h1>
        <p>App description</p>
        <Link to='/users'><button>Enter</button></Link>
      </div>
    )
  }
}
