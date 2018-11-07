import React, { Component } from 'react'

export default class MovieResult extends Component {
  render() {
    return (
      <div>
        {this.props.data.original_title}
      </div>
    )
  }
}
