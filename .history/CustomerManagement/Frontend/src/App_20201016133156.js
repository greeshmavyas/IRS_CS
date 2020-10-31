import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import OrgLogin from "./Components/OrgLogin";
import CasePage from "./Components/CasePage";
import Case from "./Components/Case";
import CaseRetrieve from "./Components/CaseRetrieve";
import AgentLogin from "../../../frontend/src/components/AgentFunctionalities/login";
import AgentDashboard from "../../../frontend/src/components/AgentFunctionalities/Dashboard";
import AgentSettings from '../../../frontend/src/components/AgentFunctionalities/Settings';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={OrgLogin}></Route>
        <Route exact path="/login" render={() => <OrgLogin />}></Route>
        <Route exact path="/home" render={() => <Home />}></Route>
        <Route exact path="/cases" component={CasePage}></Route>
        <Route exact path="/createCase" component={Case}></Route>
        <Route exact path="/retrieveCase" component={CaseRetrieve}></Route>
       
        <Route exact path="/AgentLogin" component={AgentLogin} />
        <Route exact path="/AgentDashboard" component={AgentDashboard} />
        <Route exact path="/AgentSettings" component={AgentSettings} />
      </Switch>
    </Router>
  );
}

export default App;
