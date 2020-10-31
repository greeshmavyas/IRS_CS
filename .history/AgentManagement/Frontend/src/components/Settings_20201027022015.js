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
      show: true,
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
        url: 'http://' + config.hostname + ':' + config.backendPort + '/updateProfile',
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
    var buyerEmailId = cookie.load('cookie3');
    var buyerId = cookie.load('cookie1');
    console.log("In update profile cookie 3 " + buyerEmailId)
    console.log("In update profile cookie 1 " + buyerId)
    const formData = new FormData(event.target);
    console.log("Data " + formData.get('buyerPhone'))

    console.log("Data " + formData.get('buyerName'))
    await axios({
        method: 'post',
        url: 'http://3.133.92.239:3001/updateBuyerProfile',
        data: {
            "buyerEmailId": buyerEmailId,
            "buyerName": formData.get('buyerName'),
            "buyerPhone": formData.get('buyerPhone'),
            "buyerAddress": formData.get('buyerAddress'),
            "buyerId": buyerId
        },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            console.log(response);
            if (response.data && response.data.updateResult && response.data.affectedRows === 1) {
                console.log(response.data.responseMessage);
            }
            return response.data;
        })
        .catch(function (err) {
            console.log(err)
        });
        this.setState({
            updateDone: true,
        })
}
  render() {
    return (
      <div>
        <Sidebar />
        <NavbarDash />

        <center>
          <Card style={{ width: '50rem' }}>
            
              <Form style={{ width: '45rem' }}>

                <Form.Group controlId="exampleForm.ControlInput1">
                  <br></br>

                  <h3>Update Profile</h3>
                  <br></br>
                  <strong>Email address</strong>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">


                  <strong>About me</strong>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <br></br>
                <br></br>


              </Form>
          
          </Card>
        </center>
      </div>
    )
  }
}
