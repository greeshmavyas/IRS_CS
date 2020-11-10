import React, { Component, useState } from "react";
import axios from "axios";
import CaseDisplay from "./CaseDisplay3";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";

const config = require("../settings.js");
class CaseRetrieve extends Component {
  constructor() {
    super();
    this.state = {
      cases: [],
      viewcase: null,
      modal: false,
      mstatus: "open",

      showCaseModal: false,
      currCaseId: "",
      currCaseDetails:null
    };
  }

  async componentDidMount() {
    let userId = localStorage.getItem("userId");
    //debugger;
    await axios(config.rooturl +"/"+ userId, {
      method: "get",
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then((res) => {
        if(res && res.data){
          this.setState({ cases: res.data });
          console.log("THESE ARE CASES ", this.state.cases);
        }
      })
      .catch((error) => console.log(error.response.data));
  }

  onModalClose(){
    this.setState({
      showCaseModal: false
    })
  }

  onModalShow(){
    this.setState({
      showCaseModal:true
    })
  }

  render() {
    var casedetails;
    // console.log("LLLLLLLLLL")
    console.log(this.state.cases);
    if (this.state.cases !== null) {
      casedetails = this.state.cases.map((cas) => {
        return (
          <div className="col w-75" id="casescard">
            <div
              className="card"
              style={{
                boxShadow: "2px 2px 2px #888888",
                height: "15em",
                width: "55em",
              }}
            >
              <div className="card-body">
                <div className="row">
                  <h5 className="card-title col-5">
                    Customer ID : {cas.UserID}
                  </h5>
                  {/* <div className="col-6"></div> */}
                  <div className="col-7">
                    <CaseDisplay caseDetails={cas}/>
                  </div>
                </div>
                <p className="card-text">
                  <strong>Case ID : {cas.CaseID}</strong>{" "}
                </p>
                <p className="card-text">
                  <strong>Category : {cas.Category}</strong>
                </p>

                <p className="card-text">
                  <strong>Status: {cas.Status} </strong>
                  <p></p>
                </p>

                <div className="col-10"></div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <div className="row">
          <div className="col-2"></div>
          <div className="container col-9">
            {this.state.cases.length > 0 ? (
              <div id="caseID" className="col-10">
                {casedetails}
              </div>
            ) : (
              <div>
                <h4 style={{ margin: "3em" }}>No new cases to display!</h4>
              </div>
            )}
          </div>
            </div>
      </div>
    );
  }
}


export default CaseRetrieve;
