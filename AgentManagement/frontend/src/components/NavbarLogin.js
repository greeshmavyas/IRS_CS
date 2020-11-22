import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import logo from './../css/IRS.png'

class NavbarLogin extends Component {
    
  handleLogout = () => {
    window.localStorage.clear();
  };

  render() {
    return (
      <>
  
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src={logo}
        width="33"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      IRS
    </Navbar.Brand>
  </Navbar>
</>
    );
  }
}

export default NavbarLogin;