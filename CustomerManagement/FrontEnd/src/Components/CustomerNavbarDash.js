import React, { Component } from 'react';
import {getUserName} from "./utils";
import logo from '../css/IRS.png'

class CustomerNavbarDash extends Component {
    
  handleLogout = () => {
    window.localStorage.clear();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
       <img  src={logo}
           width="33"
           height="30"
           className="d-inline-block align-top"/>
        <div className="container">
          
        <span className="navbar-brand" href="#">
          Customer Service Dashboard 
        </span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              {/*<li className="nav-item">
                <span className="nav-link">
                 {getUserName()}
                </span>
    </li>*/}
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={this.handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default CustomerNavbarDash;