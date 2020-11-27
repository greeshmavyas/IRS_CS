import React, { Component } from 'react'
import Sidebar from './Sidebar';
import {Button, Form, Table, Modal} from 'react-bootstrap'
import NavbarDash from "./NavbarDash";
import axios from 'axios';
import config from '../config/settings'
import {getUserName} from './utils'
import swal from 'sweetalert'

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
    var userName = getUserName();
    let {firstName, lastName, email, zipCode} = this.state;
    let data = {
     Username: userName,
     FirstName: firstName,
     LastName: lastName,
     Email: email,
     ZipCode: zipCode
    };
    axios({
      method: 'post',
      url: config.rooturl + '/orgOwner/profileSave',
      data
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
          <h4>Update Profile</h4>
          <br></br>
        <Form onSubmit={this.updateProfile}>
          <PassWordChange/>
          <br/> <br/>
          <Table borderless>
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

class PassWordChange extends Component{
  constructor(){
      super()
      this.state={
          show:false,
          currentPassword: "",
          newPassword :""
      }
  }

  handleClose = () => {
      this.setState({
          show: false,
          categories:[],
          currCategoryVal:""
      })
  }

  handleShow = () => {
      this.setState({
          show: true
      })
  }

  submitHandler =  (evt) => {
      evt.preventDefault();
      console.log(evt.target);
      axios.defaults.withCredentials = true;

      let {currentPassword, newPassword} = this.state;
      if(!currentPassword || !newPassword){
          swal("Please enter all the fields");
          return;
      }

      let userName = getUserName();
         axios({
            method: 'post',
            url: config.rooturl+"/updateOwnerPassword",       
            data: { "Username": userName, "CurrentPassword": currentPassword, "NewPassword": newPassword
           },
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                return response.data;
            })
            .then((responseData) => {
                swal(responseData.responseMessage).then((val)=> this.handleClose())
            }).catch((err) => {
                swal("Cannot update password").then((val)=> this.handleClose())
                console.log(err)
            });
  }

  renderCloseBtn =(name) =>{
      return (
          <button className="close" onClick={(evt) => {evt.preventDefault(); this.removeCategory(name)}}>
            &times;
           </button>
      )
  }

  onChange = (evt) =>{
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  render(){
      return(
          <>
          <Button variant="info" onClick={this.handleShow}>
              Change password
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Body>
                  <Form className="input" onSubmit = {this.submitHandler}>
                      <Form.Row>
                      <Form.Control name="currentPassword" type="password" placeholder="Current Password" onChange={this.onChange} />
                      </Form.Row>
                      <br/>
                      <Form.Row>
                      <Form.Control name="newPassword" type="password" placeholder="New Password" onChange={this.onChange} />
                      </Form.Row>
                      <br/>
                      <Button type="submit" className="btn btn-info btn-block mt-4" >Change password</Button>
                      
  
                  </Form>
              </Modal.Body>
          </Modal>
          </>
      )
  }

}

