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

          } else {
            console.log("unable to get agent details")
          }
        }).catch(function (err) {
          console.log(err)
        });
  
   
  }

  updateProfile = async (event) => {
    event.preventDefault();
    var agentID = localStorage.getItem("agentID");
    var organisationID = localStorage.getItem("organisationID")
    console.log("agentID  " + agentID)
    let data = {
      agentID: agentID,
      organisationID: organisationID,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password
    };
    axios({
      method: 'post',
      url: 'http://' + config.hostname + ':' + config.backendPort + '/updateProfile',
      params: data
  }).then((response) => {
    if (response.status == 500) {
        throw new Error("Bad response from server");
    }else{
      console.log(response);
    }
    
})
.catch(function (err) {
    console.log(err)
});
this.setState({
    updateDone: true,
})

    
  }
  render() {
      console.log("after");
      console.log(this.state);
    return (
      <div>
        <Sidebar />
        <NavbarDash />
        <center>
        <div style={{ width: '25rem' }}>
        <Form onSubmit={this.updateProfile}>
                    <Form.Group as= {Row} controlId="formBasicPhone">
                    <Form.Label column sm="2">  Phone Number</Form.Label>
                        <Form.Control type="text" name="phoneNumber" defaultValue={this.state.phoneNumber} required readOnly={this.state.readonly} />
                        
                        </Form.Group>

                    <Form.Group controlId="formBasicEmailId">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" defaultValue={this.state.password} required readOnly={this.state.readonly} />
                    </Form.Group>
                 
                    <Button variant="primary" type="submit">
                        Update Profile
                     </Button>
                </Form>
                </div>
                </center>
      </div>
    )
  }
}
