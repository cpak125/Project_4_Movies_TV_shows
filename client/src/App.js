import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import AllUsers from './components/AllUsers';
import SingleUser from './components/SingleUser';
import UserMovies from './components/UserMovies';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/users' component={AllUsers} />
          <Route exact path='/users/:id' component={SingleUser} />
          <Route exact path='/users/:user_id/movies' component={UserMovies} />
          {/* <Route exact path='/addMovie' component={AddMovie} /> */}
          {/* <Route exact path='/users/:user_id/tv_shows' component={UserTvShows} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
