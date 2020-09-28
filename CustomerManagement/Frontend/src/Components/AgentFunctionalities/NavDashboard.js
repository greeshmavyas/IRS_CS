import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'

class NavDashboard extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">IRS</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    
    <Nav>
      <Nav.Link href="#deets">Hi John</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
       Logout
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
            </div>
        )
    }
}

export default NavDashboard;