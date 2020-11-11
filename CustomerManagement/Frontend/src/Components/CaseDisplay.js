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
import CaseHistory from './CaseHistory';
import Messages from './Messages';
import {} from "./utils.js";
import swal from 'sweetalert'
import {getEmailId} from './utils';

const config = require("../settings.js");

class CaseDisplay extends Component{
    constructor(props){
        super(props);
       
        this.state={
            caseDetails: props.caseDetails,
            subscribed: false,
            history:"",
            caseId:"",
            isLoaded: false
        }
    }
  
    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});
    componentDidMount(){
        this.updateSubscribed(this.props.caseDetails)
        this.getHistory(this.props.caseDetails)
     
    }
    componentDidUpdate(prevProps){
      if(prevProps.caseId != this.props.caseId){
        this.setState({
          caseDetails: this.props.caseDetails,
          caseId: this.props.caseId,
          isLoaded: false
        })
        this.updateSubscribed(this.props.caseDetails)
        this.getHistory(this.props.caseDetails)
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
    

    getHistory = async (caseDetails)=>{
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

    render(){
      //console.log("in casedisplay render method..state is..")
      //console.log(this.state)
       let {caseDetails, isLoaded} = this.state;
       const closeBtn = (
        <button className="close" onClick={() => this.props.showModal()}>
          &times;
         </button>
      );
      if(caseDetails && isLoaded){
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
                    <span><Nav.Link  className="subscribeLink" onClick={this.subscribeOrUnsubscribe}>{this.getSubscribeMessage()}</Nav.Link></span>
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

                    <Tabs defaultActiveKey="messages" id="casetab">
                        <Tab eventKey="messages" title="Comments" tabClassName = "halfWidth">
                            <Messages messages={caseDetails.Messages} caseId={caseDetails.CaseID}/>
                        </Tab>
                        <Tab eventKey="history" title="Case History" tabClassName = "halfWidth">
                            {/*<CaseHistory caseId={caseDetails.CaseID} userId={caseDetails.UserID}/>*/}
                            <CaseHistory caseId = {this.state.caseId} history={this.state.history}/>
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
  
export default CaseDisplay;