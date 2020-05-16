import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home"
import OrgLogin from "./components/OrgLogin"
import CasePage from "./components/CasePage"
import {withCookies} from 'react-cookie'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = "/" component = {OrgLogin}></Route>
        <Route exact path = "/login" render={() => (<OrgLogin/>)}></Route>
        <Route exact path = "/home" render={() => (<Home/>)}></Route>
        <Route exact path = "/cases" component = {CasePage}></Route>
      </Switch>
    </Router>
  );
}

export default withCookies(App);
