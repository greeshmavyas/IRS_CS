import React, { Component } from "react";
import Nav from './Nav';
import Sidebar from './Sidebar';
import Card from 'react-bootstrap/Card'
import Card from 'react-bootstrap/Card'



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
  render() {
    return (
      <div>
        <card>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <center>
        <Card style={{ width: '22rem' }}>
          <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <br></br>
              <h4 >Agent Login</h4>
              <p className="lead text-center">Sign in to your account</p>
              <form  >
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
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

                
                <form action="/dashboard">
    <input type="submit" value="submit"  className="btn btn-info btn-block mt-4"/>
</form>

                <input type="submit"   />
                <br></br>
                {/* <a href="/login" class="btn btn-lg btn-light">
                    Login
                  </a> */}
              </form>
            </div>
          </div>
        </div>
        <br></br>
        </Card>
        </center>
        </card>
      </div>
    );
  }
}

export default login;
