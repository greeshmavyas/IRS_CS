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
const config = require("../settings.js");

class CaseHistory extends Component{
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
    /*componentDidMount =async ()=> {
        if(this.props.caseId && this.props.userId){
            await axios(config.rooturl + "/history/" + this.props.userId +"/"+this.props.caseId , {
                method: "get",
                config: { headers: { "Content-Type": "application/json" } }
              })
                .then((res) => {
                  this.setState({ history: res.data });
                  console.log("history: ", this.state.history);
                })
                .catch((error) => console.log(error.response.data));
        }
    }*/
    render(){
        let {history} = this.state;
        if(history && history.length > 0){
                history = history.map((cas,id) => {
                  var resComments = "";
                  if (cas.ResolutionComments != null && cas.ResolutionComments != "") {
                      {/*<p className="card-text">
                        <strong>ResolutionComments: {cas.ResolutionComments} </strong>
                    </p>*/}
                    resComments = (
                    <Row>
                        <Col xs={4}>ResolutionComments:</Col>
                        <Col xs={8}>{cas.ResolutionComments}</Col>
                    </Row>
                    );
                  }
          
                  var status = "";
                  {/*
                     <p className="card-text">
                        <strong>Status: {cas.Status} </strong>
                      </p>
                  */}
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
                  {
                    /*
                    <p className="card-text">
                            <strong>Updated On: {cas.UpdatedOn} </strong>
                          </p>
                  */}
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
            return <div>{history}</div>
        } else {
            return <div>No Case History</div>
        }
    }
}
export default CaseHistory;