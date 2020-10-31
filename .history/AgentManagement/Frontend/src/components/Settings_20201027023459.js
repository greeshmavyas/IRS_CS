import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import NavbarDash from "./NavbarDash";
import axios from 'axios';
import config from '../config/settings'



export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      contactNumber: '',
      password: '',
      updateDone: false,
    }
    this.updateProfile = this.updateProfile.bind(this);

    this.contactNumberChangeHandler = this.contactNumberChangeHandler.bind(this)
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
  }

  componentWillMount() {
    var agentID = localStorage.getItem("agentID");
    console.log("agentID  " + agentID)

    if (agentID) {

      axios({
        method: 'get',
        url: 'http://' + config.hostname + ':' + config.backendPort + '/getProfile',
        params: { "agentID": agentID },
      })
        .then((response) => {
          if (response.status === 200) {
            let agentDetails = response.data.agentDetails;
            console.log("agentDetails")
            console.log(agentDetails)
            if (agentDetails) {
              this.setState({
                contactNumber: agentDetails.contactNumber,
                password: agentDetails.password,
              });
            }
            else {
              this.setState({
                contactNumber: '',
                password: '',
              });
            }
          } else {
            console.log("unable to get agent details")
          }
        }).catch(function (err) {
          console.log(err)
        });
    } else {
      window.location.reload()
    }
  }

  updateProfile = async (event) => {
    event.preventDefault();
   
    var agentID = localStorage.getItem("agentID")
    if(agentID){
      const data = {
        contactNumber: this.state.contactNumber,
        password: this.state.password
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
      <Form.Control plaintext readOnly defaultValue={this.state.contactNumber} />
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
