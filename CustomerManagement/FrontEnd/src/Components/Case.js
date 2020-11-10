import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";
import Card from "react-bootstrap/Card";
import {getUserId, getOrganisationId} from './utils';
const config = require("../settings.js");

class Case extends Component {
  state = {
    Category: "Others",
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
    var cid = Math.floor(Math.random() * 10000);
    const data = {
      UserID: getUserId(),
      organisationID: getOrganisationId(),
      CaseID: cid.toString(),
      Category: this.state.Category,
      Information: this.state.Information,
      Status: "New",
      ResolutionComments: ""
    };
    axios
      .post(config.rooturl + "/add", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            Response: "Case Created Successfully CaseID: " + cid.toString(),
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

      //calling Lambda func to get category
      axios.get(config.awsLambda).then((response) => {
        console.log(response);
        if(response){
          const category = response;
          //TODO: call Kafka API

        }
      }).catch((error)=>{
        console.log(error);
      })
  };

  render() {
    return (
      <div style={{ height: "100%" }} className="bg-dark">
        <Header style={{ height: "10%" }}></Header>

        <br></br>
        <br></br>
        <br></br>
        <div style={{ height: "90%" }}>
          <center>
            <Card style={{ width: "35rem" }}>
              <div className="container">
                <div className="row">
                  <div className="col-md-10 m-auto">
                    <br></br>
                    <br></br>
                    <form onSubmit={this.sub}>
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

                      <button className="btn btn-info btn-block mt-4">
                        Create
                      </button>

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
