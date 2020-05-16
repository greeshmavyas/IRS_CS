import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import login from "./login";
import Dashboard from "./Dashboard";

 class Main extends Component {
    render() {
        return (
          <div>
            <Route exact path="/" component={login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        );
    }
}

export default Main;