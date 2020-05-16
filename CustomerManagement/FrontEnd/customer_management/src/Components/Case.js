import React, { Component } from "react";
import axios from "axios";

class Case extends Component {
  state = {
    Category: "",
    Information: "",
  };

  change = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  sub = (e) => {
    e.preventDefault();
    var cid = Math.random();
    const data = {
      UserID: "56666",
      CaseID: cid.toString(),
      Category: this.state.Category,
      Information: this.state.Information,
      Status: "New",
      ResolutionComments: "",
      AgentID: "1",
    };
    axios
      .post("http://localhost:4000/case/add", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          message: "Can not create case",
        });
        console.log("Error is:", error);
      });
  };

  refreshPage = (e) => {
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.sub}>
          <label>Category:</label>
          <input type="text" id="Category" onChange={this.change}></input>
          <label>Information:</label>
          <input type="text" id="Information" onChange={this.change}></input>
          <button onClick={this.refreshPage}>Create</button>
        </form>
      </div>
    );
  }
}
export default Case;
