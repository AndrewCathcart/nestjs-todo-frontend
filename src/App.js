import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { inject, observer } from 'mobx-react';

import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import TasksPage from './pages/cards/CardsPage';
import CreateTaskPage from './pages/create-card/CreateCardPage';

@inject('routerStore')
@observer
class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={SignInPage} />
        <Route path="/signin/" component={SignInPage} />
        <Route path="/signup/" component={SignUpPage} />
        <Route exact path="/cards" component={TasksPage} />
        <Route exact path="/cards/create" component={CreateTaskPage} />
      </Fragment>
    );
  }
}

export default App;
