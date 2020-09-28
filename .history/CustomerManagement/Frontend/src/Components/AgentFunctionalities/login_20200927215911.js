import React, { Component } from "react"
import Card from 'react-bootstrap/Card'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import NavbarLogin from './NavbarLogin'
import axios from 'axios';
import config from './Settings'
import { Redirect } from 'react-router'

class login extends Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      password: "",
      SignedUpFlag: false,
      message: "",
    }

    this.emailIDChangeHandler = this.usernameChangeHandler.bind(this)
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
  }

  usernameChangeHandler = (e) => {
    var str = (e.target.value).toLowerCase()
    this.setState({
      emailID: str
    })
  }
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  submitLogin = (e) => {
    console.log("in submit Login")
    const data = {
      emailId: this.state.emailID,
      password: this.state.password
    }
    console.log("data is..")
    console.log(data);
    e.preventDefault();
    axios.defaults.withCredentials = true;

    axios({
      method: 'post',
      url: 'http://' + config.hostname + ':' + config.backendPort + '/agentLogin',
      params: data,
    })
      .then(response => {
        console.log("Status Code : ", response.status);
        console.log("Response from Sign Up ")
        console.log(response);

        if (response.data.responseMessage === 'Login Successfully') {
          this.setState({
            SignedUpFlag: true
          })
        } else {
          this.setState({
            SignedUpFlag: false,
            message : 'Invalid Credentials'
          })
          console.log(this.state.message)

        }
      }).catch(error => {
        console.log(error);
        this.setState({
          SignedUpFlag: false,
          message : 'Invalid Credentials'
        })
        console.log(this.state.message)
      })
  }

  render() {
    if (this.state.SignedUpFlag === true) {
      return <Redirect to="/AgentDashboard" />
    }
  
    return (

      <div>
        <NavbarLogin />
        <br></br>
        <br></br>
        <br></br>
        <center>
          <Card style={{ width: '25rem' }}>
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br></br>
                  <h4>Agent Login in to IRS</h4>
                  <br></br>
                  <Form className="input">
                    <Form.Row>
                      <Form.Control placeholder="Email ID" onChange={this.emailIDChangeHandler} />
                      <br></br>
                      <br></br>
                      <Form.Control placeholder="Password" type="password" onChange={this.passwordChangeHandler} />
                      <br></br>
                      <Button className="btn btn-info btn-block mt-4" onClick={this.submitLogin} >Login</Button>
                    </Form.Row>
                    <p className="text-danger">{this.state.message}</p>
                    <br></br>
                    <br></br>

                  </Form>
                </div>
              </div>
            </div>
          </Card>
        </center>
      </div>
    );
  }
}

export default login;
