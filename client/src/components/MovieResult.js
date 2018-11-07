import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'


export default class MovieResult extends Component {
  render() {
      const data=this.props.data
    return (
      <div>
        <div><img src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`} alt='movie poster'/></div>
        <div>{data.title}</div>
        <div>{data.release_date}</div>
        <div>{data.overview}</div>
        <div><Button onClick={this.props.addNewMovie}>Add to List</Button></div>

      </div>
    )
  }
}
