import React, {Component, useState} from 'react';
import axios from 'axios';
import { getOrganizationID } from './utils.js'
import {Button, Col, Row, Table, Form, Modal} from 'react-bootstrap'
import  config from '../config/settings'
import NavbarDash from "./NavbarDash";
import Sidebar from './Sidebar'
import swal from 'sweetalert'

class AgentsList extends Component{
    constructor(){
        super()
        this.state = {
           agentsList:[],
           isLoading: true
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: config.rooturl + '/agents',
          })
            .then(response => {
                console.log(response)
              console.log("Status Code : ", response.status);
              console.log("Response from Org lookup")
              console.log(response.data);
      
              if (response.data && response.data.responseMessage && response.data.responseMessage.indexOf("All agents") !== -1) {
                  //TODO: when org is found
                  this.setState({
                      agentsList: response.data.agents
                  });
              } 
              this.setState({
                  isLoading: false
              })
            }).catch(error => {
              console.log(error);
              this.setState({
                    isLoading: false
              })
            })
    }

    processArray(arr){
        let categoryStr = ""
        for(let i=0; i<arr.length; i++){
            let elem = arr[i]
            categoryStr = categoryStr + elem.split("_")[1] + " ,"
        }
        return categoryStr.substr(0, categoryStr.length-1)
    }

    render(){

        if(this.state.isLoading){
            return <div></div>
        }

        let {agentsList} = this.state
        if(agentsList && agentsList.length > 0){
            console.log(agentsList);
            
            agentsList = agentsList.map((agent) => {
                    return (
                              <tr>
                                <td style={{ width: '50rem' }}>{agent.Username} </td>
                                <td style={{ width: '10rem' }}>{agent.FirstName}</td>
                                <td style={{ width: '15rem' }}>{agent.LastName}</td>
                                <td style={{ width: '50rem' }}>{agent.Email} </td>
                                <td style={{ width: '50rem' }}>{this.processArray(agent.Categories)} </td>
                              </tr>
                    );
                });
              

            return(
                <div>
                     <NavbarDash />
                    <div className="row">
                        <div className="col-2">
                            <Sidebar />
                        </div>
                    </div>
                   
                    <div className="container col-8">
                        <Row>
                            <Col><h4> Available agents</h4></Col>
                            <Col><AddAgent/></Col>
                        </Row>
                        <br></br>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th style={{ width: '15rem' }}>User Name</th>
                                <th style={{ width: '15rem' }}>First Name</th>
                                <th style={{ width: '50rem' }}>Last Name</th>
                                <th style={{ width: '50rem' }}>Email</th>
                                <th style={{ width: '50rem' }}>Categories</th>
                            </tr>
                            </thead>
                            <tbody>
                                {agentsList}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )
        }
    }
}

function AddAgent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitHandler = async (evt) => {
      evt.preventDefault();
      console.log(evt.target);
      var formData = new FormData(evt.target);
      //axios.defaults.withCredentials = true;
      let categories = formData.get('categories').split(",");
      let orgId = getOrganizationID();
      categories = categories.map((cat) => {
          return orgId+"_"+cat
      })
        await axios({
            method: 'post',
            url: config.rooturl+"/addAgent",
            // data: {"jsonData" : JSON.stringify(data)},        
            data: { "OrgId": orgId, "Email": formData.get('email'), "Username": formData.get('userName'), "FirstName" : formData.get('firstName'), 
            "LastName": formData.get('lastName'), "Categories": categories
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
                swal(responseData.responseMessage)
                handleClose()
            }).catch(function (err) {
                swal("cannot add the agent")
                console.log(err)
                handleClose()
            });
  }
    return(
        <>
        <Button variant="info" onClick={handleShow}>
            Add an Agent
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Agent Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="input" onSubmit = {submitHandler}>
                    <Form.Row>
                    <Form.Control name="firstName" placeholder="First Name"  />
                    </Form.Row>
                    <br/>
                    <Form.Row>
                    <Form.Control name="lastName" placeholder="Last Name"  />
                    </Form.Row>
                    <br/>
                    <Form.Row>
                    <Form.Control name="userName" placeholder="User Name"  />
                    </Form.Row>
                    <br/>
                    <Form.Row>
                    <Form.Control name="email" placeholder="Email"  />
                    </Form.Row>
                    <br/>
                    <Form.Row>
                    {
                        /*TODO: Change categories to dropdown */
                    }
                    <Form.Control name="categories" placeholder="Categories"  />
                    </Form.Row>
                    <br/>
                    <Button type="submit" className="btn btn-info btn-block mt-4" >Add Agent</Button>
                    

                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}
export default AgentsList