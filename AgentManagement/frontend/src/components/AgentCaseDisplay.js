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
import '../css/agent.css';
import AgentCaseHistory from './AgentCaseHistory';
import Messages from './Messages';
import {} from "./utils.js";
import swal from 'sweetalert'
import {getEmailId, getAgentId, getOrganisationId, removeOrgId} from './utils';
import AddAgentMessage from './AddAgentMessage'

const config = require("../config/settings.js");

class AgentCaseDisplay extends Component{
    constructor(props){
        super(props);
       
        this.state={
            caseDetails: props.caseDetails,
            history:"",
            caseId:"",
            isLoaded: false,
            activeKey:'caseDetails'
        }
    }
  
    handleClose = () => this.setState({show:false, activeKey: "caseDetails"});
    handleShow = () => this.setState({show:true, activeKey: "caseDetails"});
    componentDidMount(){
        this.getHistory(this.props.caseDetails)
     
    }
    componentDidUpdate(prevProps){
      if(prevProps.caseId != this.props.caseId){
        this.setState({
          caseDetails: this.props.caseDetails,
          caseId: this.props.caseId,
          isLoaded: false,
          activeKey: "caseDetails"
        })
        this.getHistory(this.props.caseDetails)
      }
    }
    changeActiveKey = (key) =>{
        console.log("active key:", key)
        this.setState({
          activeKey: key
        })
      }

    
    getHistory = async ()=>{
      let {caseDetails} = this.props
        this.setState({
            isLoaded: false
        })
      if(caseDetails && caseDetails.CaseID && caseDetails.UserID){
        await axios(config.rooturl + "/history/" + caseDetails.UserID +"/"+caseDetails.CaseID  , {
            method: "get",
            config: { headers: { "Content-Type": "application/json" } }
          })
            .then((res) => {
              this.setState({ history: res.data, isLoaded:true });
              console.log("history: ", this.state.history);
            })
            .catch((error) => {
                console.log(error.response.data)
                this.setState({
                    isLoaded: true
                })
            });
      }
    }

    render(){
       let {caseDetails, isLoaded} = this.state;
       const closeBtn = (
        <button className="close" onClick={() => this.props.showModal()}>
          &times;
         </button>
      );
      if(caseDetails){
        return (
              <Modal  
              isOpen={this.props.modal}
              toggle={() => this.props.showModal()}
              className="modal-lg"
              scrollable>
                <ModalHeader
                      size="lg"
                      toggle={() => this.props.showModal()}
                      close={closeBtn}
                    >
                    <div className="flex">
                    <span>Case ID: {caseDetails.CaseID}</span>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Tabs activeKey={this.state.activeKey} id="casetab" onSelect={(k) => this.changeActiveKey(k)}>
                        <Tab eventKey="caseDetails" title="Case Details">
                           <CaseDetails caseDetails = {caseDetails} changeActiveKey = {this.changeActiveKey} handleClose={this.handleClose} getHistory={this.getHistory}/>
                        </Tab>
                        <Tab eventKey="history" title="Case History">
                            {/*<CaseHistory caseId={caseDetails.CaseID} userId={caseDetails.UserID}/>*/}
                            {isLoaded && <AgentCaseHistory caseId = {this.state.caseId} history={this.state.history}/>}
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
  
export default AgentCaseDisplay;

class CaseDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            caseDetails: props.caseDetails,
            newStatus: ''
        }
    }

    isNotResolvedCase = () =>{
         let {caseDetails} = this.state;
         console.log("isNotResolvedCase:"+ !(caseDetails.Status && caseDetails.Status.toLowerCase() == 'resolved'))
         return !(caseDetails.Status && caseDetails.Status.toLowerCase() == 'resolved')
    }

    handleChange = (e) => {
        let status = e.target.value;
        this.setState({
          newStatus: status
        });
      }
  
      updateStatus = () =>{
        console.log("In updateStatus in case display")
        console.log(this.state.newStatus);
        let {caseDetails} = this.state
        if(this.state.newStatus !== "" && caseDetails.Status !== this.state.newStatus){
          console.log("in if block")
          console.log("In status")
          console.log(this.state.newStatus)
          console.log("in old status")
          console.log(caseDetails.Status);
          let data = {
            caseID: caseDetails.CaseID,
            status: this.state.newStatus,
            userID: caseDetails.UserID
          }
          axios('http://' + config.hostname + ':' + config.backendPort + '/updateStatus',{
            method: 'post',
            data: data
          }).then((response) => {
          if (response.status == 500) {
            throw new Error("Bad response from server");
          }else{
            console.log("in update status..")
            this.props.getHistory();
            swal("Status updated successfully").then((val)=> this.props.changeActiveKey("history"))
            console.log(response);
          }
        }).catch(function (err) {
            console.log(err)
          });
          caseDetails.Status = this.state.newStatus; 
      }
    }

    render(){
        let {caseDetails} = this.state;
        return(
            <>
             <Container className="caseDetailsTab">
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
                    {this.isNotResolvedCase() && <Col>
                        <select id="Status" defaultValue={caseDetails.Status} onChange={this.handleChange}>
                        <option value="Assigned">Assigned</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        </select>
                    </Col>}

                    {!this.isNotResolvedCase() && <Col>
                       {caseDetails.Status}
                    </Col>}

                    <Col>{removeOrgId(caseDetails.Category)}</Col>
                </Row>
            </Container>
        <br/>
        {this.isNotResolvedCase() && <AddAgentMessage caseId = {caseDetails.CaseID} changeActiveKey = {this.props.changeActiveKey} handleClose={this.props.handleClose} getHistory = {this.props.getHistory} updateStatus = {this.updateStatus}/>}
         </>
        )
    }
}