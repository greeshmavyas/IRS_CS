import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import NavbarDash from "./NavbarDash";
import axios from 'axios';
import config from '../config/settings'
import { Row, Col } from 'react-foundation';



export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      phoneNumber: '',
      password: '',
      updateDone: false,
    }
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentWillMount() {
    var agentID = localStorage.getItem("agentID");
    var organisationID = localStorage.getItem("organisationID")
    console.log("agentID  " + agentID)
    let data = {
      agentID: agentID,
      organisationID: organisationID
    };
      axios({
        method: 'get',
        url: 'http://' + config.hostname + ':' + config.backendPort + '/getProfile',
        params: data,
      })
        .then((response) => {
          if (response.status === 200) {
            let agentDetails = response.data.agent;
            console.log("agentDetails")
            console.log(agentDetails)
              this.setState({
                password: agentDetails.password,
                phoneNumber: agentDetails.phoneNumber
              });
              console.log("after state")
              console.log(this.state.phoneNumber)
              console.log(this.state.password)
          
          } else {
            console.log("unable to get agent details")
          }
        }).catch(function (err) {
          console.log(err)
        });
   
  }

  updateProfile = async (event) => {
    event.preventDefault();
   
    var agentID = localStorage.getItem("agentID")
    var organisationID = localStorage.getItem("organisationID")

    if(agentID){
      const data = {
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
        agentID: agentID,
        organisationID: organisationID
      }
      axios({
        method: 'post',
        url: 'http://' + config.hostname + ':' + config.backendPort + '/updateProfile',
        params: data,
      }).then((response) =>{
        if(response.status === 200){
          this.setState({
            updateDone: true,
            message:'profile updated'
          })
        }else{
          this.setState({
            updateDone: true,
            message:'profile updation failed'
          })
        }
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      window.location.reload()
    }
   
    
  }
  render() {
    return (
      <div>
        <Sidebar />
        <NavbarDash />
        <Form>
          <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2"> Contact Number </Form.Label>
    <Col sm="10">
      <Form.Control plaintext readOnly defaultValue={this.state.phoneNumber} />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextPassword">
    <Form.Label column sm="2">Password</Form.Label>
    <Col sm="10">
      <Form.Control type="password"/>
    </Col>
  </Form.Group>
</Form>
       
          
      </div>
    )
  }
}
