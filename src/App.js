import React, { Component } from 'react';
import './App.css';
import Chat from './components/chat/chat';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import AddRoom from './components/add-room/add-room';
import { PrivateRoute } from './components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from './actions';
import { userService, history } from './services';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import Workspace from './components/workspace/workspace';

class App extends Component {
  constructor(props) {
    super(props);

    if (sessionStorage.getItem('workspace')) {
      this.props.dispatch(userActions.setWorkspace(JSON.parse(sessionStorage.getItem('workspace'))));
    }

    userService.silentLogin().then(res => {
      if (res.success) {
        this.props.dispatch(userActions.silentLogin(res.data));
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div className='container-app'>
            <PrivateRoute exact path='/' component={Workspace} />
            <Route exact path='/workspace' component={Workspace} />
            <PrivateRoute exact path='/:workspace/chat' component={Chat} />
            <Route path="/:workspace/login" component={Login} />
            <Route path="/:workspace/signup" component={Signup} />
            <Route path="/:workspace/add-room" component={AddRoom} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(App);
