import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CustomerNavbarLogin from "./CustomerNavbarLogin";
import { Redirect } from "react-router";
import config from "../config/settings.js"
import axios from "axios";
import Home from "./Home.js"

class CustomerOrgLogin extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      //organisationId: "",
      //userName:"",
      //emailId:"",
      errors: {},
      loggedIn: false
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginHandler = (evt) => {
    evt.preventDefault();
    let {customerId} = this.state;
    axios({
      method: 'get',
      url: config.rooturl+"/details/"+customerId
    }).then((resp)=>{
      debugger;
      console.log(resp);
      if(resp && resp.data && resp.data.length > 0){
        let details = resp.data[0];
        window.localStorage.setItem("customerId", details.CustomerID);
        window.localStorage.setItem("organisationId", details.OrganisationID);
        window.localStorage.setItem("customerName", details.CustomerName);
        window.localStorage.setItem("emailId", details.Email);
        window.localStorage.setItem("userType", "customer");
      }
      this.setState({
        loggedIn: true
      })
    });
  };

  render() {
    debugger;
    if(this.state.loggedIn){
      return <Home/>
    }

    return (
      <div>
        <CustomerNavbarLogin />
        <br></br>
        <br></br>
        <br></br>
        <center>
          <Card style={{ width: "25rem" }}>
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br></br>
                  <h5>Login</h5>
                  <br></br>
                  <form onSubmit = {this.loginHandler}>
                    <div className="form-group">
                     
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Customer ID"
                        name="customerId"
                        value={this.state.customerId}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                     
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name="password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                    >
                      Login
                    </button>

                    <br></br>
                    <br></br>
                  </form>
                </div>
              </div>
            </div>
          </Card>
        </center>
      </div>
    );
  }
}

export default CustomerOrgLogin;
