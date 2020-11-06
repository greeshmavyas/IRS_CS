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
      contactNumber: '',
      password: '',
      updateDone: false,
    }
    this.updateProfile = this.updateProfile.bind(this);
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
    if (agentID) {
      const data = {
        contactNumber: this.state.contactNumber,
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
        <p>Hello</p>
        <Sidebar />
        <NavbarDash />
        


      </div>
    )
  }
}
