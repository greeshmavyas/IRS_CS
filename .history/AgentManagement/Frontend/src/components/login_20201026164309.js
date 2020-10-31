import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import NavbarLogin from './NavbarLogin'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import config from '../../config/settings'
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
    return (
      <div>
        <NavbarLogin />
        <br></br>
        <br></br>
        <br></br>
          <Card style={{ width: '25rem', 'margin-left': '35%' }}>
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br></br>
                  <center><h5>Login in as Agent</h5></center>
                  <br></br>
                  <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email"
                        className="form-control form-control-lg"
                        placeholder="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange} />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <center>
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                    </center>
                  </Form>
                  <br></br>
                </div>
              </div>
            </div>
          </Card>
      </div>
    );
  }
}

export default login;
