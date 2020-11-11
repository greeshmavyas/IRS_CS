import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import NavbarLogin from './NavbarLogin'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import config from '../config/settings'
import { Redirect } from 'react-router'

class OrgOwnerReg extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      userName:"",
      email:"",
      password:"",
      zipCode:"",
      SignedUpFlag: false,
      message: "",
    }

    //this.emailIDChangeHandler = this.emailIDChangeHandler.bind(this)
    //this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    //this.submitLogin = this.submitLogin.bind(this)
  }

  componentDidMount = () => {
    localStorage.clear();

  }

  onChangeHandler = (e) => {
      var name= e.target.name
      var str = (e.target.value).toLowerCase()
      this.setState({
          [name]: str
      })
  }
  /*passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value
    })
  }*/
  submitSignUp = (e) => {
    console.log("in submit SignUp")
    const data = {
      FirstName: this.state.firstName,
      Lastname: this.state.lastName,
      Username:this.state.userName,
      Email:this.state.email,
      Password:this.state.Password,
      ZipCode:this.state.zipCode
    }
    console.log("data is..")
    console.log(data);
    e.preventDefault();
    axios.defaults.withCredentials = true;

    axios({
      method: 'post',
      url: config.rooturl + '/orgOwner/signUp',
      data: data,
    })
      .then(response => {
        console.log("Status Code : ", response.status);
        console.log("Response from Signup ")
        console.log(response.data);

        if (response.data && response.data.responseMessage && response.data.responseMessage.toLowerCase().indexOf('orgowner added') !== -1) {
          this.setState({
            SignedUpFlag: true
          })
          //localStorage.setItem("token", response.data.token);
          localStorage.setItem("userName", response.data.cookie2);
          localStorage.setItem("firstName", response.data.cookie3);
          localStorage.setItem("lastName", response.data.lastName);
          localStorage.setItem("token", response.data.token);

        } else {
          this.setState({
            SignedUpFlag: false,
            message : response.data && response.data.responseMessage ? response.data.responseMessage: 'cannot signup'
          })
          console.log(this.state.message)

        }
      }).catch(error => {
        console.log(error);
        this.setState({
          SignedUpFlag: false,
          message : 'Cannot register Org Owner'
        })
        console.log(this.state.message)
      })
  }

  render() {
    if (this.state.SignedUpFlag === true) {
      return <Redirect to="/OrgOwnerLogin" />
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
                  <div className="col-md-10 m-auto">
                    <br></br>
                    <h4>Organization Owner Signup to IRS</h4>
                    <br></br>
                    <Form className="input">
                      <Form.Row>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="firstName" placeholder="First Name" onChange={this.onChangeHandler} />
                        </Form.Row>

                        <Form.Row>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" placeholder="Last Name" onChange={this.onChangeHandler} />
                        </Form.Row>
                        
                        <Form.Row>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control name="userName" placeholder="User Name" onChange={this.onChangeHandler} />
                        </Form.Row>
                        
                        <Form.Row>
                        <Form.Label>Email </Form.Label>
                        <Form.Control name="email" placeholder="Email" onChange={this.onChangeHandler} />
                        </Form.Row>
                        
                        <Form.Row>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={this.onChangeHandler} />
                        </Form.Row>
                        
                        <Form.Row>
                        <Form.Label>ZipCode</Form.Label>
                        <Form.Control name="zipCode" placeholder="Zip Code" onChange={this.onChangeHandler} />
                        </Form.Row>
                        <br></br>
                        <Button className="btn btn-info btn-block mt-4" onClick={this.submitSignUp} >Signup</Button>
                      
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

export default OrgOwnerReg;
