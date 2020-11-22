import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import OrgLogin from "./Components/OrgLogin";
import { withCookies } from "react-cookie";
import CustomerDashboard from "./Components/CustomerDashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={OrgLogin}></Route>
        <Route exact path="/login" render={() => <OrgLogin />}></Route>
        <Route exact path="/home" render={() => <Home />}></Route>
        <Route exact path="/customerDashboard" component={CustomerDashboard}></Route>
      </Switch>
    </Router>
  );
}

export default withCookies(App);
