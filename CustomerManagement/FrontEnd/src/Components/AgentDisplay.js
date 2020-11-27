import React, { Component,useState } from "react";
import axios from "axios";
import {
    Button,
    Table,
    Form
  } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
//import '../css/customer.css';
import CustomerCaseHistory from './CustomerCaseHistory';
import CustomerMessages from './CustomerMessages';
import {} from "./utils.js";
import swal from 'sweetalert'
import {getEmailId, getCustomerId} from './utils';

const config = require("../config/settings");

class AgentDisplay extends Component{
    constructor(props){
        super(props);
       
        this.state={
            agentDetails: props.agentDetails,
            agentId:"",
            show:false
        }
    }

    handleClose = () => {this.setState({show:false}); };

    updateHandler = async (evt)=>{
        evt.preventDefault();
        var formData = new FormData(evt.target);
        axios.defaults.withCredentials = true;
        let email = formData.get('email');
        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');
        let phoneNumber = formData.get('phoneNumber');
        let userName = this.state.agentDetails.Username;

        if(!email || !userName || !firstName || !lastName || !phoneNumber){
            swal("Please enter all the details");
            return;
        }
        await axios({
            method: 'put',
            url: config.rooturl+"/org/agent",       
            data: { "Username":userName, "Email": email, "FirstName" : firstName, 
            "LastName": lastName, "PhoneNumber": phoneNumber
           },
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                return response.data;
            })
            .then((responseData) => {
                swal(responseData.responseMessage)
            }).catch(function (err) {
                swal("cannot update the agent")
                console.log(err)
            });

    }

    render(){
        let {agentDetails} = this.state;
        const closeBtn = (
         <button className="close" onClick={() => this.props.showModal()}>
           &times;
          </button>
       );
       if(agentDetails ){
        return (
            
              <Modal  
              isOpen={this.props.modal}
              toggle={() => this.props.showModal()}
              className="modal-md"
              scrollable>
                <ModalHeader
                      toggle={() => this.props.showModal()}
                      close={closeBtn}
                    >
                    <span>Agent Details</span>
                </ModalHeader>
                <ModalBody>
                <Form className="input" onSubmit = {this.updateHandler}>
                    <Table borderless>
                        <tbody>
                            <tr>
                                <td>User Name</td>
                                <td>{agentDetails.Username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td><Form.Control name="email" placeholder="Email" defaultValue={agentDetails.Email} /></td>
                            </tr>
                            <tr>
                                <td>First Name</td>
                                <td><Form.Control name="firstName"  defaultValue={agentDetails.FirstName} /></td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td> <Form.Control name="lastName" defaultValue={agentDetails.LastName} /></td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td><Form.Control name="phoneNumber" placeholder="Phone Number" defaultValue={agentDetails.PhoneNumber} /></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button type="submit" className="btn btn-info btn-block mt-4" >Update Agent</Button>
                       {/* <Form.Row>
                        <Form.Label>User Name</Form.Label>
                        </Form.Row>
                        <Form.Row>
                        <Form.Label>{agentDetails.Username}</Form.Label>
                        </Form.Row>
                        <br/>                       
                        <Form.Row>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" placeholder="Email" defaultValue={agentDetails.Email} />
                        </Form.Row>
                        <br/>
                        <Form.Row>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="firstName"  defaultValue={agentDetails.FirstName} />
                        </Form.Row>
                        <br/>
                        <Form.Row>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" defaultValue={agentDetails.LastName} />
                        </Form.Row>
                        <br/>
                        <Form.Row>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control name="phoneNumber" placeholder="Phone Number" defaultValue={agentDetails.PhoneNumber} />
                        </Form.Row>
                        <br/>
                        <Button type="submit" className="btn btn-info btn-block mt-4" >Update Agent</Button>*/}
                    </Form>
                    <br></br>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </Modal>
          )
        }

    }
}

export default AgentDisplay;