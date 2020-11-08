import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import NavbarLogin from "./NavbarLogin";
import { Redirect } from "react-router";

class OrgLogin extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      password: "",
      name: "",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginHandler = () => {
    let userId = this.state.userId;
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("userType", "customer");
  };

  render() {
    let userId = localStorage.getItem("userId");

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
                      <strong>UserID</strong>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="User ID"
                        name="userId"
                        value={this.state.userId}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <strong>Password</strong>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
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
