import React, { Component,useState } from "react";
import axios from "axios";
import {
    Button,
    Row,
    Col,
    Container,
    Tabs,
    Tab,
    Nav
  } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import '../css/customer.css';
import CustomerCaseHistory from './CustomerCaseHistory';
import CustomerMessages from './CustomerMessages';
import {} from "./utils.js";
import swal from 'sweetalert'
import {getEmailId, getCustomerId} from './utils';

const config = require("../config/settings");

class CustomerCaseDisplay extends Component{
    constructor(props){
        super(props);
       
        this.state={
            caseDetails: props.caseDetails,
            subscribed: false,
            history:"",
            caseId:"",
            isLoaded: false,
            activeKey: this.showMessages(props.caseDetails) ? "messages": "history"
        }
    }
  
    handleClose = () => {this.setState({show:false}); };
    handleShow = () => {this.setState({show:true}); };

    componentDidMount(){
        this.updateSubscribed(this.props.caseDetails)
        this.getHistory()
     
    }
    componentDidUpdate(prevProps){
      if(prevProps.caseId != this.props.caseId){
        this.setState({
          caseDetails: this.props.caseDetails,
          caseId: this.props.caseId,
          isLoaded: false,
          activeKey: this.showMessages(this.props.caseDetails) ? "messages": "history"
        })
        console.log("isLoaded is::",this.state.isLoaded)
        this.updateSubscribed(this.props.caseDetails)
        this.getHistory()
      }
    }

    updateSubscribed = (caseDetails) =>{
      const emailId = getEmailId();
      if(caseDetails && caseDetails.Subscribers){
        let subscribers = caseDetails.Subscribers;
        if(subscribers.indexOf(emailId) !== -1){
          this.setState({
            subscribed: true
          })
        }
      }
    }
    

    getHistory = async ()=>{
      let {caseDetails} = this.props;
      console.log("get history called..");
      console.log(caseDetails.CaseID, " ", caseDetails.UserID);
      if(caseDetails && caseDetails.CaseID && caseDetails.UserID){
        await axios(config.rooturl + "/history/" + caseDetails.UserID +"/"+caseDetails.CaseID  , {
            method: "get",
            config: { headers: { "Content-Type": "application/json" } }
          })
            .then((res) => {
              this.setState({ history: res.data, isLoaded:true });
              console.log("history: ", this.state.history);
            })
            .catch((error) => console.log(error.response.data));
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
        emailId: getEmailId(),
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

    changeActiveKey = (key) =>{
      console.log("active key:", key)
      this.setState({
        activeKey: key
      })
    }

    closeCase = () =>{
      let caseId = this.state.caseDetails.CaseID;
      debugger;
      let customerId = getCustomerId();
      let data = {
        "CaseID": caseId,
        "Status":"Resolved"
      }
      let url = config.rooturl+"/status/"+customerId
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
            if(response.status == 200){
              swal("Case is resolved").then((resp)=>{
                this.handleClose();
                window.location.reload(false)
              })
             
            }
              
        }).catch(function (err) {
            console.log(err)
        });
    }
    showMessages = (caseDetails) =>{
     // let {caseDetails} = this.state;
      console.log("showMessages:"+ !(caseDetails.Status && caseDetails.Status.toLowerCase() == 'resolved'))
      return !(caseDetails.Status && caseDetails.Status.toLowerCase() == 'resolved')
    }

    render(){
       let {caseDetails} = this.state;
       const closeBtn = (
        <button className="close" onClick={() => this.props.showModal()}>
          &times;
         </button>
      );
      if(caseDetails ){
        return (
            
              <Modal  
              isOpen={this.props.modal}
              toggle={() => this.props.showModal()}
              className="modal-xl"
              scrollable>
                <ModalHeader
                      size="lg"
                      toggle={() => this.props.showModal()}
                      close={closeBtn}
                    >
                    <div className="flex">
                    <span>Case ID: {caseDetails.CaseID}</span>
                    <span>
                      {this.state.caseDetails.Status !== "Resolved" && <Nav.Link  className="subscribeLink" onClick={this.subscribeOrUnsubscribe}>{this.getSubscribeMessage()}</Nav.Link>}
                    </span>
                    {this.state.caseDetails.Status !== "Resolved" && (<Col><Button variant="info" onClick={this.closeCase} >Close Case</Button></Col>)}
                    </div>
                    
                </ModalHeader>
                <ModalBody>
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

                    <Tabs activeKey={this.state.activeKey} id="casetab" onSelect={(k) => this.changeActiveKey(k)}>
                       { this.showMessages(caseDetails) && <Tab eventKey="messages" title="Comments" tabClassName = "halfWidth" >
                            <CustomerMessages messages={caseDetails.Messages} caseId={caseDetails.CaseID} changeActiveKey = {this.changeActiveKey} getHistory = {this.getHistory}/>
                        </Tab>}
                        <Tab eventKey="history" title="Case History" tabClassName = "halfWidth" >
                            {this.state.isLoaded && <CustomerCaseHistory caseId = {this.state.caseId} history={this.state.history}/>}
                        </Tab>
                    </Tabs>
                  
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </Modal>
          )
        } else {
          return <div></div>
        }
    }
    
  }
  
export default CustomerCaseDisplay;