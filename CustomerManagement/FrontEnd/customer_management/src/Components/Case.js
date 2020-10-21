import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";
import Card from 'react-bootstrap/Card'

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
      <div style={{height: "100%"}} className="bg-dark">
        <Header style={{height: "10%"}}></Header>
       
        
        <br></br>
        <br></br>
        <br></br>
        <div  style={{height: "90%"}}>
        <center>
          
          <Card style={{ width: '35rem' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-10 m-auto">
              <br></br>
                <br></br>
                <form onSubmit={this.sub}>
                  <div className="form-group">
                  <strong>Category:</strong>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="Category"
                      value={this.state.Category}
                      onChange={this.change}
                      placeholder="Category"
                    />
                  </div>
                  <div className="form-group">
                  <strong>Information:</strong>
                    <textarea
                      type="text"
                      id="Information"
                      className="form-control form-control-lg"
                      placeholder="Information"
                      name="Information"
                      value={this.state.Information}
  
                      onChange={this.change}
                    />
                  </div>
  
                    <button className = "btn btn-info btn-block mt-4">Create</button>
  
                    <br></br>
                    <br></br>
                </form>
                <h6>{this.state.Response}</h6>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
          </Card>
          </center>
  
        </div>
        



      </div>
    );
  }
}
export default Case;
