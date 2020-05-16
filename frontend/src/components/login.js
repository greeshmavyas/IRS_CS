import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import NavbarLogin from './NavbarLogin'


class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      userType: "",
      errors: {},
    };
    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  
  render() {
    return (
      <div>
        <NavbarLogin/>
        <br></br>
        <br></br>
        <br></br>
        <center>
        <Card style={{ width: '25rem' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <br></br>
              <h5>Login in as Agent</h5>
              <br></br>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <strong>Username</strong>
                  <input
                 
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
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

                {/* <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="student"
                    name="userType"
                    value="student"
                    onChange={this.onChange}
                  />
                  <label className="custom-control-label" htmlFor="student">
                    Student
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="company"
                    name="userType"
                    value="company"
                    onChange={this.onChange}
                  />
                  <label className="custom-control-label" htmlFor="company">
                    Company
                  </label>
                </div> */}

               
                 <a href="/dashboard" class="btn btn-info btn-block mt-4">
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

export default login;
