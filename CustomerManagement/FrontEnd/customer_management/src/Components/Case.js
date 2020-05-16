import React, { Component } from "react";
import axios from "axios";

class Case extends Component {
  state = {
    Category: "",
    Information: "",
    Response: "",
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
            Response: "Case Created Successfully" + cid.toString(),
            Category: "",
            Information: "",
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

  render() {
    return (
      <div>
        <form onSubmit={this.sub}>
          <label>Category:</label>
          <input
            type="text"
            id="Category"
            value={this.state.Category}
            onChange={this.change}
          ></input>
          <label>Information:</label>
          <input
            type="text"
            id="Information"
            value={this.state.Information}
            onChange={this.change}
          ></input>
          <button>Create</button>
        </form>
        <div>{this.state.Response}</div>
      </div>
    );
  }
}
export default Case;
