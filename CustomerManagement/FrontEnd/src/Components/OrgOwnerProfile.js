import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import NavbarDash from "./NavbarDash";
import axios from 'axios';
import config from '../config/settings'
import { Row, Col } from 'react-foundation';
import Table from 'react-bootstrap/Table'
import {getUserName} from './utils'

export default class OrgOwnerProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName:'',
      email:'',
      zipCode:'',
      userName:'',
      password:''
    }
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentWillMount() {
   var userName = getUserName();
    console.log("userName  " + userName)
      axios({
        method: 'get',
        url: config.rooturl + '/orgOwner/profile/'+userName
      })
        .then((response) => {
          if (response.status === 200 && response.data._id) {
            let ownerDetails = response.data;
            console.log("ownerDetails")
            console.log(ownerDetails)
              this.setState({
                firstName: ownerDetails.FirstName,
                lastName: ownerDetails.LastName,
                userName:ownerDetails.Username,
                email:ownerDetails.Email,
                zipCode: ownerDetails.ZipCode
              });

          } else {
            console.log("unable to get org owner details")
          }
        }).catch(function (err) {
          console.log(err)
        });
  
   
  }

  onChange = (evt) =>{
      this.setState({
          [evt.target.name]: evt.target.value
      })
  }

  updateProfile = async (event) => {
    event.preventDefault();
    
   /* var agentID = localStorage.getItem("agentID");
    var organisationID = localStorage.getItem("organisationID")
    console.log("agentID  " + agentID)
    let data = {
     Username: 
    };
    axios({
      method: 'post',
      url: 'http://' + config.hostname + ':' + config.backendPort + '/updateProfile',
      params: data
  }).then((response) => {
    if (response.status == 500) {
        throw new Error("Bad response from server");
    }else{
      console.log(response);
      this.setState({
        message: "Profile Updated"
      })
    }
    
})
.catch(function (err) {
    console.log(err)
});
this.setState({
    updateDone: true,
})

   */
  }

  render() {
      console.log("after");
      console.log(this.state);
    return (
      <div>
        <Sidebar />
        <NavbarDash />
        <center>
        <div style={{ width: '25rem' }}>
          <h2>Update Profile</h2>
          <br></br>
          <br></br>
        <Form onSubmit={this.updateProfile}>
          <Table>
            <tbody>
            <tr>
                <td>
                <Form.Label>User Name</Form.Label>

                </td>
                <td>
                <Form.Label>{this.state.userName} </Form.Label>

                </td>

              </tr>
              <tr>
                <td>
                <Form.Label >  First Name</Form.Label>
                </td>
                <td>
                <Form.Control type="text" name="firstName" defaultValue={this.state.firstName} required onChange={this.onChange}  />
                </td>

              </tr>
              <tr>
                <td>
                <Form.Label>Last Name</Form.Label>

                </td>
                <td>
                <Form.Control type="text" name="lastName" defaultValue={this.state.lastName} required onChange={this.onChange} />

                </td>

              </tr>
              
              <tr>
                <td>
                <Form.Label>Email</Form.Label>

                </td>
                <td>
                <Form.Control type="email" name="email" defaultValue={this.state.email} required onChange={this.onChange} />

                </td>

              </tr>
              <tr>
                <td>
                <Form.Label>Zip Code</Form.Label>
                </td>
                <td>
                <Form.Control type="text" name="zipCode" defaultValue={this.state.zipCode} required onChange={this.onChange} />
                </td>
              </tr>
            </tbody>
          </Table>             
            <Button className="btn btn-info btn-block mt-4" type="submit">
                Update Profile
            </Button>
                </Form>
                <br></br>
            
                <p>{this.state.message}</p>
                </div>
                </center>
      </div>
    )
  }
}
