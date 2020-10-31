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
   
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
  
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
