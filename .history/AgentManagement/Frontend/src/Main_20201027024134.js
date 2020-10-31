import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import login from './components/login';
import Dashboard from './components/Dashboard';
import updateProfile from './components/updateProfile';

 class Main extends Component {
    render() {
        return (
          <div>
            <Route exact path="/" component={login} />
            <Route exact path="/AgentDashboard" component={Dashboard} />
            <Route exact path="/updateProfile" component={updateProfile} />
          </div>
        );
    }
}

export default Main;