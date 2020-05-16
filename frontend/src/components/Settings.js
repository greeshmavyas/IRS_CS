import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class Settings extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Sidebar/>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Update Skill Set</Form.Label>
  
    <Form.Control as="select">
      <option>Skill 1</option>
      <option>Skill 2</option>
      <option>Skill 3</option>
      <option>Skill 4</option>
      <option>Skill 5</option>
    </Form.Control>
  </Form.Group>
  
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>About me</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Update
  </Button>
</Form>
            </div>
        )
    }
}
