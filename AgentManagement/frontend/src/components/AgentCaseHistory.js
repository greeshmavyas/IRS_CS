import React, { Component,useState } from "react";
import axios from "axios";
import {
    Button,
    Modal,
    Row,
    Col,
    Container,
    Tabs,
    Tab,
    Form,
    Card
  } from "react-bootstrap";
const config = require("../config/settings.js");

class AgentCaseHistory extends Component{
    constructor(props){
        super(props);
        this.state={
            caseId: props.caseId,
            userId:props.userId,
            history:props.history,
            caseId:props.caseId
        }
    }
    componentDidUpdate(prevProps){
      if(prevProps.caseId !== this.props.caseId){
        this.setState({
          history: this.props.history
        })
      }
    }
    render(){
        let {history} = this.state;
        console.log("history is:");
        console.log(history);
        history = history.reverse();
        if(history && history.length > 0){
                history = history.map((cas,id) => {
                  var resComments = "";
                  if (cas.ResolutionComments != null && cas.ResolutionComments != "") {
                    resComments = (
                    <Row>
                        <Col xs={4}>ResolutionComments:</Col>
                        <Col xs={8}>{cas.ResolutionComments}</Col>
                    </Row>
                    );
                  }
          
                  var status = "";
                  if (cas.Status != null) {
                    status = (
                     <Row>
                        <Col xs={4}>Status:</Col>
                        <Col xs={8}>{cas.Status}</Col>
                     </Row>
                    );
                  }
                  let comment = "";
                  if (cas.Comment != null) {
                    comment = (
                     <Row>
                        <Col xs={4}>Comment:</Col>
                        <Col xs={8}>{cas.Comment}</Col>
                     </Row>
                    );
                  }
                  return (
                    <div id="casescard" key={id}>
                      <div
                        className="card"
                      >
                        <div className="card-body">
                          {status}
                          {resComments}
                          {comment}
                          <Row>
                              <Col xs={4}>Updated On:</Col>
                              <Col xs={8}>{cas.UpdatedOn}</Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  );
                });
            return <div className="caseHistoryTab">{history}</div>
        } else {
            return <div>No Case History</div>
        }
    }
}
export default AgentCaseHistory;