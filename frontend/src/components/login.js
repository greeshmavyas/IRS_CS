import React, { Component } from "react";

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
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
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

                <input type="submit" className="btn btn-info btn-block mt-4" />
                {/* <a href="/login" class="btn btn-lg btn-light">
                    Login
                  </a> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default login;
