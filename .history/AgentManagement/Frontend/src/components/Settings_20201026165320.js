import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import NavbarDash from "./NavbarDash";



export default class Settings extends Component {
    render() {
        return (
            <div>
              <Sidebar/>
              <NavbarDash/>

              <center>
              <Card style={{ width: '50rem' }}>
                <center>
                <Form style={{ width: '45rem' }}>
                    
  <Form.Group controlId="exampleForm.ControlInput1">
  <br></br>

    <h3>Update Profile</h3>
    <br></br>
    <strong>Email address</strong>
    <Form.Control type="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
  
  
  <strong>About me</strong>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Update
  </Button>
  <br></br>
  <br></br>


</Form>
</center>
</Card>
</center>
            </div>
        )
    }
}
