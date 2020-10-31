import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import OrgLogin from "./Components/OrgLogin";
import CasePage from "./Components/CasePage";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={OrgLogin}></Route>
        <Route exact path="/login" render={() => <OrgLogin />}></Route>
        <Route exact path="/home" render={() => <Home />}></Route>
      </Switch>
    </Router>
  );
}

export default App;
