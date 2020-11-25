import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import CustomerOrgLogin from "./Components/CustomerOrgLogin";
import { withCookies } from "react-cookie";
import CustomerDashboard from "./Components/CustomerDashboard";
import OrgOwnerDashboard from "./Components/OrgOwnerDashboard";
import updateProfile from "./Components/updateProfile";
import OrgOwnerReg from "./Components/OrgOwnerReg";
import OrgOwnerLogin from "./Components/OrgOwnerLogin";
import Organization from "./Components/Organization";
import OrgRegistration from "./Components/OrgRegistration";
import AgentsList from "./Components/AgentsList";
import OrgCase from "./Components/OrgCase";
import OrgCasesDisplay from "./Components/OrgCasesDisplay";
import OrgOwnerProfile from "./Components/OrgOwnerProfile";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CustomerOrgLogin} />
        <Route exact path="/login" render={() => <CustomerOrgLogin />}></Route>
        <Route exact path="/home" render={() => <Home />}></Route>
        <Route
          exact
          path="/customerDashboard"
          component={CustomerDashboard}
        ></Route>
        <Route exact path="/OrgOwnerReg" component={OrgOwnerReg} />
        <Route exact path="/OrgOwnerLogin" component={OrgOwnerLogin} />
        <Route exact path="/OrgOwnerDashboard" component={OrgOwnerDashboard} />
        <Route exact path="/Organization" component={Organization} />
        <Route exact path="/updateProfile" component={updateProfile} />
        <Route exact path="/OrgRegistration" component={OrgRegistration} />
        <Route exact path="/Agents" component={AgentsList} />
        <Route exact path="/OrgCases" component={OrgCasesDisplay} />
        <Route exact path="/OrgCase" component={OrgCase} />
        <Route exact path="/OrgOwnerProfile" component={OrgOwnerProfile}/>

      </Switch>
    </Router>
  );
}

export default withCookies(App);
