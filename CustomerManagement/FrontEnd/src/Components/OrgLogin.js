import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import NavbarLogin from "./NavbarLogin";
import { Redirect } from "react-router";

class OrgLogin extends Component {
  constructor() {
    super();
    this.state = {
      customerId: "",
      organisationId: "",
      customerFirstName:"",
      customerEmail:"",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginHandler = () => {
    let {customerId, organisationId, customerFirstName, customerEmail} = this.state;
    window.localStorage.setItem("customerId", customerId);
    window.localStorage.setItem("organisationId", organisationId);
    window.localStorage.setItem("customerUserName", customerUserName);
    window.localStorage.setItem("customerEmail", customerEmail);
    window.localStorage.setItem("userType", "customer");
  };

  render() {

    return (
      <div>
        <NavbarLogin />
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
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <strong>Customer ID</strong>
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
                      <strong>Organisation ID</strong>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Organisation ID"
                        name="organisationId"
                        value={this.state.organisationId}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <strong>Customer User Name</strong>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Customer User Name"
                        name="customerUserName"
                        value={this.state.customerUserName}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <strong>Customer Email</strong>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Customer Email"
                        name="customerEmail"
                        value={this.state.customerEmail}
                        onChange={this.onChange}
                      />
                    </div>

                    <a
                      href="/home"
                      onClick={this.loginHandler}
                      className="btn btn-info btn-block mt-4"
                    >
                      Login
                    </a>

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

export default OrgLogin;
