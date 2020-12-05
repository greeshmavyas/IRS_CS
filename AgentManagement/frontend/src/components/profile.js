import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import NavbarDash from "./NavbarDash";
import axios from 'axios';
import config from '../config/settings'
import { Row, Col } from 'react-foundation';
import Table from 'react-bootstrap/Table'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {getAgentId, getOrganisationId} from './utils'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      phoneNumber: '',
      password: '',
      updateDone: false,
      readOnly:'',
      currentPassword:'',
      newPassword:''
    }
    this.updateProfile = this.updateProfile.bind(this);
    this.phoneNumberChangeHandler = this.phoneNumberChangeHandler.bind(this)

    this.newPasswordChangeHandler = this.newPasswordChangeHandler.bind(this)
    this.currentPasswordChangeHandler = this.currentPasswordChangeHandler.bind(this)

  }
  newPasswordChangeHandler = (e) => {
    this.setState({
        newPassword: e.target.value
    })
}
  currentPasswordChangeHandler= (e) => {
    this.setState({
        currentPassword: e.target.value
    })
}

phoneNumberChangeHandler = (e) => {
    this.setState({
        phoneNumber: e.target.value
    })
}
changePassword = () => {
    let currentPassword = this.state.currentPassword
    let password = this.state.password

    if(password == currentPassword){
       var agentID = getAgentId();
       var organisationID = getOrganisationId()
    console.log("agentID in update password  " + agentID)
    let data = {
      agentID: agentID,
      organisationID: organisationID,
      phoneNumber: this.state.phoneNumber,
      password: this.state.newPassword
    };
    console.log(data)
    axios('http://' + config.hostname + ':' + config.backendPort + '/updateProfile',{
      method: 'post',
      data: data
  }).then((response) => {
    if (response.status == 500) {
        throw new Error("Bad response from server");
    }else{
      console.log(response);
      this.setState({
        message: "Profile Updated"
      })
    }
    
})
.catch(function (err) {
    console.log(err)
});
this.setState({
    updateDone: true,
})
    
        
    }else{
        this.setState({
            message: "Incorrect password"
        })
        alert("Incorrect password")
    }

    this.showModal()
}
showModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }; 

  componentDidMount() {
    let agentID = getAgentId();
    let organisationID = getOrganisationId()
    console.log("agentID  " + agentID)
    let data = {
      agentID: agentID,
      organisationID: organisationID
    };
      axios({
        method: 'put',
        url: 'http://' + config.hostname + ':' + config.backendPort + '/getProfile',
        data: data,
      })
        .then((response) => {
          if (response.status === 200) {
            let agentDetails = response.data.agent;
            console.log("agentDetails")
            console.log(agentDetails)
              this.setState({
                password: agentDetails.Password,
                phoneNumber: agentDetails.PhoneNumber
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
    var agentID = getAgentId();
    var organisationID = getOrganisationId()
    console.log("agentID  " + agentID)
    let data = {
      agentID: agentID,
      organisationID: organisationID,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password
    };
    console.log(data)
    axios({
      method: 'post',
      url: 'http://' + config.hostname + ':' + config.backendPort + '/updateProfile',
      data: data
  }).then((response) => {
    if (response.status == 500) {
        throw new Error("Bad response from server");
    }else{
      console.log(response);
      this.setState({
        message: "Profile Updated"
      })
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
      const closeBtn = (
        <button className="close" onClick={() => this.showModal()}>
          &times;
        </button>
      );
    return (
      <div>
        <Sidebar />
        <NavbarDash />
        <center>
        <div style={{ width: '25rem',marginTop:'6rem' }}>
          <h2>Update Profile</h2>
          <br></br>
          <br></br>
        <Form onSubmit={this.updateProfile}>
          <Table>
            <tbody>
              <tr>
                <td>
                <Form.Label >  Phone Number</Form.Label>
                </td>
                <td>
                <Form.Control type="text" name="phoneNumber" onChange={this.phoneNumberChangeHandler} defaultValue={this.state.phoneNumber} />
                </td>

              </tr>
              <tr>
                <td>
                <Form.Label>Password</Form.Label>

                </td>
                <td>
                <Form.Control type="password" name="password" onClick={() => this.showModal()} defaultValue={this.state.password} />
                </td>
              </tr>
            </tbody>
          </Table>
                    <Button className="btn btn-info btn-block mt-4" type="submit">
                        Update Profile
                     </Button>
                </Form>
                <br></br>
            
                <p>{this.state.message}</p>
                </div>
                </center>

                <Modal
          isOpen={this.state.modal}
          toggle={() => this.showModal()}
          className="modal-popup"
          scrollable
        >
          <ModalHeader toggle={() => this.showModal()} close={closeBtn}>
            Change Password
          </ModalHeader>
          <ModalBody className="modal-body">
          <Form onSubmit={() => this.changePassword()}>
          <Table>
            <tbody>
              <tr>
                <td>
                <Form.Label >Current Password</Form.Label>
                </td>
                <td>
                <Form.Control type="password" onChange={this.currentPasswordChangeHandler}/>
                </td>

              </tr>
              <tr>
                <td>
                <Form.Label>New Password</Form.Label>
                </td>
                <td>
                <Form.Control type="password" onChange={this.newPasswordChangeHandler} />
                </td>
              </tr>
            </tbody>
          </Table>
          <center>
                    <Button className = 'btn btn-info'  type="submit">
                        Update Password
                     </Button>
                     </center>
                </Form>

          </ModalBody>
       
        </Modal>
      </div>
    )
  }
}