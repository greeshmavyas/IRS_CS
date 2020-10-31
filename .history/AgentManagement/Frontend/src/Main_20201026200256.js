import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import login from './components/login';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

 class Main extends Component {
    render() {
        return (
          <div>
            <Route exact path="/" component={login} />
            <Route exact path="/AgentDashboard" component={Dashboard} />
            <Route exact path="/settings" component={Settings} />
          </div>
        );
    }
}

export default Main;