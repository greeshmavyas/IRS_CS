import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import NavbarLogin from './NavbarLogin'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import config from '../config/settings'
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

    this.emailIDChangeHandler = this.emailIDChangeHandler.bind(this)
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
  }

  componentDidMount = () => {
    localStorage.clear();

  }

  emailIDChangeHandler = (e) => {
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
          //localStorage.setItem("token", response.data.token);
          localStorage.setItem("firstname", response.data.info.firstname);
          localStorage.setItem("organisationID", response.data.info.organisationID);
          localStorage.setItem("agentID", response.data.info.agentID);

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
                    <h4>Agent Login in to idhenah? IRS</h4>
                    <br></br>
                    <Form className="input">
                      <Form.Row>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control placeholder="Email ID" onChange={this.emailIDChangeHandler} />
                        
                        <Form.Label>Password</Form.Label>
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
