import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'


export default class MovieResult extends Component {

  addNewMovie = (movieId, title, releaseDate, overview, posterPath) => {
    this.props.addNewMovie(movieId, title, releaseDate, overview, posterPath)
    this.props.handleClose()
  }


  render() {
    return (
      <div>
        <div><img src={this.props.poster_path} alt='movie poster' /></div>
        <div>{this.props.title}</div>
        <div>{this.props.release_date}</div>
        <div>{this.props.overview}</div>
        
        <div>
          <Button onClick={() => this.addNewMovie(this.props.title, this.props.movie_id, this.props.release_date, this.props.overview, this.props.poster_path)}>Add to List</Button>
        </div>

      </div>
    )
  }
}
