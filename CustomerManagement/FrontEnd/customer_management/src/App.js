import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Case from "./Components/Case";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Home </h1>
        <Case addCase={this.addCase} />
      </div>
    );
  }
}

export default App;
