import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import OrgLogin from "./Components/OrgLogin";
import CasePage from "./Components/CasePage";
import Case from "./Components/Case";
import { withCookies } from "react-cookie";
import CustomerDashboard from "./Components/CustomerDashboard";
import CaseDisplay from "./Components/CaseDisplay";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={OrgLogin}></Route>
        <Route exact path="/login" render={() => <OrgLogin />}></Route>
        <Route exact path="/home" render={() => <Home />}></Route>
        <Route exact path="/cases" component={CasePage}></Route>
        <Route exact path="/createCase" component={Case}></Route>
        <Route exact path="/customerDashboard" component={CustomerDashboard}></Route>
        <Route exact path = "/caseDisplay" component = {CaseDisplay}></Route>
      </Switch>
    </Router>
  );
}

export default withCookies(App);
