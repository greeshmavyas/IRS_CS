import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
//import Case from './Case';

class CaseLeft extends Component {
  render() {
    return (
      <div className="bg-dark" style={{ color: "white", height: "100%" }}>
        <div style={{ height: "30%" }}></div>

        <div style={{ height: "40%", color: "white", textAlign: "center" }}>
          <h3>
            Intelligent Routing system, an automated tool to solve customer
            issues efficiently and quickly.
          </h3>
        </div>

        <div style={{ height: "30%" }}>
          <Col className="col-3 offset-md-5">
            <a href="/createCase" className="btn btn-primary">
              Create a case
            </a>
          </Col>

          <Col className="col-3 offset-md-5">
            <a href="/retrieveCase" className="btn btn-primary">
              Retrieve a case
            </a>
          </Col>
        </div>
      </div>
    );
  }
}

export default CaseLeft;
