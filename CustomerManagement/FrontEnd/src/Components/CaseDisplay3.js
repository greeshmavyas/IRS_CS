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
    Nav
  } from "react-bootstrap";
import '../css/customer.css';
import CaseHistory from './CaseHistory';
import Messages from './Messages';
import {getCustomerEmailId} from "./utils.js";
import swal from 'sweetalert'

const config = require("../settings.js");

class CaseDisplay3 extends Component{
    constructor(props){
        super(props);
       
        this.state={
            show:false,
            case: null,
            caseDetails: props.caseDetails,
            subscribed: false
        }
    }
  
    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});
    componentDidMount(){
      const emailId = getCustomerEmailId();
      if(this.state.caseDetails && this.state.caseDetails.Subscribers){
        let subscribers = this.state.caseDetails.Subscribers;
        if(subscribers.indexOf(emailId)){
          this.setState({
            subscribed: true
          })
        }
        
      }
    }
    getSubscribeMessage = ()=>{
      return this.state.subscribed ? "Unsubscribe": "Subscribe"
    }
    subscribeOrUnsubscribe = ()=>{
      let url = config.rooturl+"/subscribe"
      let subscribeStatus = this.state.subscribed
      if(subscribeStatus){
        url = config.rooturl+"/unsubscribe"
      }
      console.log("url is:"+url)

      let data = {
        emailId: getCustomerEmailId(),
        caseId: this.state.caseDetails.CaseID
      }
      axios({
        method: 'post',
        url,
        data,
        config: { headers: { 'Content-Type': 'application/json' } },
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            if(responseData.status){
                
                this.setState({
                  subscribed: !this.state.subscribed
                })
                swal(responseData.message)
                console.log(responseData.message);
            } else {
                swal(responseData.message)
                console.log("subscribe or unsubscribe cannot be done")
            }
            
        }).catch(function (err) {
            console.log(err)
        });

    }

    render(){
       let {caseDetails} = this.state;
        return (
            <>
              <Button variant="primary" onClick={this.handleShow}>
                View Details
              </Button>
        
              {caseDetails && <Modal  size="lg" show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Case ID: {caseDetails.CaseID}</Modal.Title>
                    <Nav.Link  onClick={this.subscribeOrUnsubscribe}>{this.getSubscribeMessage()}</Nav.Link>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col><b>Description:</b></Col>
                        </Row>
                        <Row>
                            <Col>{caseDetails.Information}</Col>
                        </Row>
                        <br></br>
                        <br></br>
                        <Row>
                            <Col><b>Status:</b></Col>
                            <Col><b>Category:</b></Col> 
                        </Row>
                        <Row>
                            <Col>{caseDetails.Status}</Col>
                            <Col>{caseDetails.Category}</Col>
                        </Row>
                    </Container>

                    <br></br>
                    <br></br>

                    <Tabs defaultActiveKey="messages" id="casetab">
                        <Tab eventKey="messages" title="Messages" tabClassName = "halfWidth">
                            <Messages messages={caseDetails.Messages} caseId={caseDetails.CaseID}/>
                        </Tab>
                        <Tab eventKey="history" title="Case History" tabClassName = "halfWidth">
                            <CaseHistory caseId={caseDetails.CaseID} userId={caseDetails.UserID}/>
                        </Tab>
                    </Tabs>
                  
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>}
            </>
          );
    }
    
  }
  
export default CaseDisplay3;