import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import login from "./login";
import Dashboard from "./Dashboard";
import Settings from './Settings';

 class Main extends Component {
    render() {
        return (
          <div>
            <Route exact path="/" component={login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/settings" component={Settings} />
          </div>
        );
    }
}

export default Main;