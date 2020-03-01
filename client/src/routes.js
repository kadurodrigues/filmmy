import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/movie' component={Movie} />
      </Switch>
    </Router>
  )
}

export default Routes;