import React, { Component } from "react";
import axios from "axios";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";

class CaseHistoryView extends Component {
  constructor() {
    super();
    this.state = {
      cases: [],
      viewcase: null,
      modal: false,
      mstatus: "open",
    };
  }
  async componentDidMount() {
    let userId = localStorage.getItem("userId");
    let caseId = localStorage.getItem("caseId");
    //debugger;
    await axios("http://localhost:4000/irs/history/" + userId + "/" + caseId, {
      method: "get",
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then((res) => {
        this.setState({ cases: res.data });
        console.log("THESE ARE CASES ", this.state.cases);
      })
      .catch((error) => console.log(error.response.data));
  }

  render() {
    var casedetails;
    console.log(this.state.cases);
    if (this.state.cases !== null) {
      casedetails = this.state.cases.map((cas) => {
        var resComments = "";
        if (cas.ResolutionComments != null && cas.ResolutionComments != "") {
          resComments = (
            <p className="card-text">
              <strong>ResolutionComments: {cas.ResolutionComments} </strong>
            </p>
          );
        }

        var status = "";
        if (cas.Status != null) {
          status = (
            <p className="card-text">
              <strong>Status: {cas.Status} </strong>
            </p>
          );
        }
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
                </div>
                <p className="card-text">
                  <strong>Case ID : {cas.CaseID}</strong>{" "}
                </p>
                {status}
                {resComments}
                <p className="card-text">
                  <strong>Updated On: {cas.UpdatedOn} </strong>
                </p>
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
              <div>
                <div className="col w-75" id="casescard">
                  <div
                    className="card"
                    style={{
                      boxShadow: "2px 2px 2px #888888",
                      height: "15em",
                      width: "55em",
                    }}
                  >
                    <div className="card-body bg-primary text-white">
                      <div className="row">
                        <h5 className="card-title col-5">
                          Customer Info :{" "}
                          {
                            this.state.cases[this.state.cases.length - 1]
                              .Information
                          }
                        </h5>
                      </div>
                      <p className="card-text">
                        <strong>
                          Case Created On :{" "}
                          {
                            this.state.cases[this.state.cases.length - 1]
                              .CreatedOn
                          }
                        </strong>{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div id="caseID" className="col-10">
                  {casedetails}
                </div>
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

export default CaseHistoryView;
