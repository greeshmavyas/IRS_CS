import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import NavbarLogin from './NavbarLogin'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      userType: "",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <center>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                    </center>
                  </Form>
                  <br></br>
                  {/*  <form onSubmit={this.onSubmit}>
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
                 <a href="/dashboard" class="btn btn-info btn-block mt-4">
                    Login
                  </a> 
                  <br></br>
                  <br></br>
              </form> */}
                </div>
              </div>
            </div>
          </Card>
      </div>
    );
  }
}

export default login;
