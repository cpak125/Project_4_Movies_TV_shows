import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import AllUsers from './components/AllUsers';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/users' component={AllUsers} />
        </Switch>
      </Router>
    );
  }
}

export default App;
