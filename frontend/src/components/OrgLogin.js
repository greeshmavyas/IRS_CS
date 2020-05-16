import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import NavbarLogin from './NavbarLogin';
import {Redirect}  from 'react-router';
import Cookies from 'universal-cookie';

class OrgLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name:"",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginHandler = () =>{
      debugger;
      let email = this.state.email;
      let dotIdx = email.indexOf(".");
      let name = email.substr(0, dotIdx);
      const cookies = new Cookies();
      this.setState({
          name:name
      })
      cookies.set('name', name);
  };
  
  render() {
    const cookies = new Cookies();
    let name = cookies.get('name');
    let redirectVar = "";
    if(name){
        redirectVar = <Redirect to="/home"/>;
    }
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
              <h5>Login</h5>
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

                  <button onClick={this.loginHandler} className = "btn btn-info btn-block mt-4">
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

export default OrgLogin;
