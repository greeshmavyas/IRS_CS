import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import {Button, Card} from 'react-bootstrap'
import axios from 'axios';
import config from '../config/settings'
import NavbarDash from "./NavbarDash";
import Sidebar from './Sidebar'
import {getOrgOwnerId} from './utils';
import { Redirect } from 'react-router';

class OrgRegistration extends Component{

    constructor() {
        super();
        this.state = {
          orgName: "",
          domain: "",
          caseCategories:"",
          registered:false
        }
    }

    onChangeHandler = (e) => {
        var name= e.target.name
        var str = (e.target.value).toLowerCase()
        this.setState({
            [name]: str
        })
    }

    submitRegistration = (e) => {
        console.log("in submit org registration")
        let categoryStr = this.state.caseCategories+",others";

        const data = {
          //TODO: put orgownerId
          OrgOwnerId : getOrgOwnerId(),
          OrgName: this.state.orgName,
          Categories: categoryStr.split(","),
          Domain: this.state.domain
        }
        console.log("data is..")
        console.log(data);
        e.preventDefault();
        axios.defaults.withCredentials = true;
    
        axios({
          method: 'post',
          url: config.rooturl + '/registerOrg',
          data: data,
        })
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log("Response from Signup ")
            console.log(response.data);
    
            if (response.data && response.data.responseMessage && response.data.responseMessage.indexOf("Your organization is registered successfully") !== -1) {
              this.setState({
                registered: true
              })
              alert(response.responseMessage)
            } else {
             alert("Cannot register the organization")
            }
          }).catch(error => {
            console.log(error);
            this.setState({
              message : 'Cannot register Organization'
            })
          })
      }

    render(){
      if(this.state.registered){
        return <Redirect to="/Organization" />
      } else {
        return(
          <div>
               <NavbarDash />
                       <div className="row">
                          <div className="col-2">
                          <Sidebar />
                          </div>
                      </div>
          
          <center>
          <Card style={{ width: '25rem' }}>
            <div className="container">
              <div className="row">
                <div className="col-md-10 m-auto">
                  <br></br>
                  <h4>Organization Registration</h4>
                  <br></br>
                  <Form className="input">
                    <Form.Row>
                      <Form.Label>Organization Name</Form.Label>
                      <Form.Control name="orgName" placeholder="Organization Name" onChange={this.onChangeHandler} />
                      </Form.Row>

                      <Form.Row>
                      <Form.Label>Domain</Form.Label>
                      <Form.Control name="domain" placeholder="Domain" onChange={this.onChangeHandler} />
                      </Form.Row>
                      
                      <Form.Row>
                      <Form.Label>Case Categories</Form.Label>
                      <Form.Control name="caseCategories" placeholder="Categories" onChange={this.onChangeHandler} />
                      </Form.Row>

                      <br></br>
                      <Button className="btn btn-info btn-block mt-4" onClick={this.submitRegistration} >Register</Button>
                    
                    <br></br>
                    <br></br>

                  </Form>
                </div>
              </div>
            </div>
          </Card>
        </center>
        </div>
      )
      }
        
    }
}
export default OrgRegistration;