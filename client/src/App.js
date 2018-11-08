import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import AllUsers from './components/AllUsers';
import SingleUser from './components/SingleUser';
import UserMovies from './components/UserMovies';
import SingleMovie from './components/SingleMovie';
import UserTvShows from './components/UserTvShows';
import SingleTVShow from './components/SingleTVShow';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/users' component={AllUsers} />
          <Route exact path='/users/:id' component={SingleUser} />
          <Route exact path='/users/:user_id/movies' component={UserMovies} />
          <Route exact path='/users/:user_id/tv_shows' component={UserTvShows} />
          <Route exact path='/users/:user_id/movies/:id' component={SingleMovie} />
          <Route exact path='/users/:user_id/tv_shows/:id' component={SingleTVShow} />
        </Switch>
      </Router>
    );
  }
}

export default App;
