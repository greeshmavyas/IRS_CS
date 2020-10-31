import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AgentLogin from "./Components/AgentFunctionalities/login";
import AgentDashboard from "./Components/AgentFunctionalities/Dashboard";
import AgentSettings from './Components/AgentFunctionalities/Settings';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/AgentLogin" component={AgentLogin} />
        <Route exact path="/AgentDashboard" component={AgentDashboard} />
        <Route exact path="/AgentSettings" component={AgentSettings} />
      </Switch>
    </Router>
  );
}

export default App;