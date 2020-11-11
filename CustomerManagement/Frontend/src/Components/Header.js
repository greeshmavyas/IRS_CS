import React, { Component } from "react";
import { Row, Col, Link } from 'react-bootstrap';


class Header extends Component{
    render(){
        return(

<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/customerDashboard">
            IRS
          </a>
          <div className="collapse navbar-collapse" id="mobile-nav">
            
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="/home">
                 Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={this.handleLogout}>
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        );
        
    }
}

export default Header;