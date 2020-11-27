import React, {Component} from 'react';
import axios from 'axios';
import { getUserName } from './utils.js'
import {Button, Nav, Container, Col, Row} from 'react-bootstrap'
import  config from '../config/settings'
import NavbarDash from "./NavbarDash";
import Sidebar from './Sidebar'
import OrgDetails from './OrgDetails';
import NoOrgFound from './NoOrgFound.js';
import { Redirect } from 'react-router'

class Organization extends Component{
    constructor(){
        super()
        this.state = {
            orgFound: false,
            orgDetails:"",
            isLoading: false
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: config.rooturl + '/org/' + getUserName(),
          })
            .then(response => {
                console.log(response)
              console.log("Status Code : ", response.status);
              console.log("Response from Org lookup")
              console.log(response.data);
      
              if (response.data && response.data.OrgOwnerId !== -1) {
                  //TODO: when org is found
                  this.setState({
                      orgFound: true,
                      orgDetails: response.data,
                      
                  })
              } 
              this.setState({
                  isLoading: true
              })
            }).catch(error => {
              console.log(error);
              this.setState({
                    isLoading: true
              })
            })
    }

    render(){
        if(!getUserName()){
            return <Redirect to="/OrgOwnerLogin" />
        }
        if(!this.state.isLoading)
            return <div></div>
            
        if(this.state.orgFound){
            return <OrgDetails orgDetails = {this.state.orgDetails}/>
        }else {
            return (
                
            <NoOrgFound/>
                )
        }
    }
    /*<div>
                     <NavbarDash />
                         <div className="row">
                            <div className="col-2">
                            <Sidebar />
                            </div>
                        </div>
                        <Container>
                            <Row><Col className="offset-md-5"><h4>No Organization Found</h4></Col></Row>
                            <Row>
                                <Col className="col-3 offset-md-5">
                                    <Nav.Link href="/OrgRegistration">
                                        <Button className="btn btn-info btn-block mt-2">Register Organization</Button>
                                    </Nav.Link>
                                </Col>
                            </Row>
                        </Container>
            </div>*/
}
export default Organization