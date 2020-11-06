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
      show: true,
      message: '',
      phoneNumber: '',
      password: '',
      updateDone: false,
    }
    this.updateProfile = this.updateProfile.bind(this);

    this.phoneNumberChangeHandler = this.phoneNumberChangeHandler.bind(this)
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
  }

  componentDidMount = () => {
    this.setState({
      phoneNumber: this.props.profileInfo.phoneNumber,
      password: this.props.profileInfo.password
    })
}


  componentDidMount() {
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
                phoneNumber: agentDetails.phoneNumber,
                password: agentDetails.password,
              });
            }
            else {
              this.setState({
                phoneNumber: '',
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
    if (agentID) {
      const data = {
        phoneNumber: this.state.phoneNumber,
        password: this.state.password
      }
      axios({
        method: 'post',
        url: 'http://' + config.hostname + ':' + config.backendPort + '/updateProfile',
        params: data,
      }).then((response) => {
        if (response.status === 200) {
          this.setState({
            updateDone: true,
            message: 'profile updated'
          })
        } else {
          this.setState({
            updateDone: true,
            message: 'profile updation failed'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
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
            <Form.Label column sm="2"> Phone Number </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={this.state.phoneNumber} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">Password</Form.Label>
            <Col sm="10">
              <Form.Control type="password" />
            </Col>
          </Form.Group>
        </Form>
        


      </div>
    )
  }
}
