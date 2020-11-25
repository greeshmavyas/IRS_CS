import React, {Component, useState} from 'react';
import axios from 'axios';
import { getOrganizationID, getOrgCategories } from './utils.js'
import {Button, Col, Row, Table, Form, Modal} from 'react-bootstrap'
import  config from '../config/settings'
import NavbarDash from "./NavbarDash";
import Sidebar from './Sidebar'
import swal from 'sweetalert'
import NoOrgFound from './NoOrgFound.js';

class AgentsList extends Component{
    constructor(){
        super()
        this.state = {
           agentsList:[],
           isLoading: true
        }
    }

    componentDidMount(){
        let orgId = getOrganizationID()
        axios({
            method: 'get',
            url: config.rooturl + '/agents/'+orgId,
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
       
        let orgId = getOrganizationID()
        if(!orgId){
            return <NoOrgFound/>
        }
        
        let getDisplayText = () =>{
            return this.state.agentsList && this.state.agentsList.length > 0 ? "Available Agents": "No agents available"
        }
        let displayAgents = () => {
            let {agentsList} = this.state
            if(agentsList && agentsList.length > 0){
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

                return (
                    <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th style={{ width: '50rem' }}>User Name</th>
                                <th style={{ width: '50rem' }}>First Name</th>
                                <th style={{ width: '50rem' }}>Last Name</th>
                                <th style={{ width: '50rem' }}>Email</th>
                                <th style={{ width: '50rem' }}>Categories</th>
                            </tr>
                            </thead>
                            <tbody>
                                {agentsList}
                            </tbody>
                        </Table>
                )
            }     
        }
        let {agentsList} = this.state
        //if(agentsList && agentsList.length > 0){
            console.log(agentsList);
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
                            <Col><h4> {getDisplayText()}</h4></Col>
                            <Col><AddAgent/></Col>
                        </Row>
                        <br></br>
                        {displayAgents()}
                    </div>
                </div>
            )
        //}
    }
}

class AddAgent extends Component{
    constructor(){
        super()
        this.state={
            show:false,
            categories: [],
            currCategoryVal :""
        }
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    updateCategoryInState =()=>{
        let {categories, currCategoryVal} = this.state
        console.log(this.state.categories)

        if(categories.indexOf(currCategoryVal) !== -1){
            swal("Category already exists")
            this.setState({
              currCategoryVal: ""
            })
        } else {
            this.setState({
                categories: [...categories, currCategoryVal],
                currCategoryVal: ""
            })
        }
    }

    dropdownChangeHandler = (evt) =>{
        this.setState({
            currCategoryVal: evt.target.value
        })
    }

    submitHandler = async (evt) => {
        evt.preventDefault();
        console.log(evt.target);
        var formData = new FormData(evt.target);
        //axios.defaults.withCredentials = true;

        let {categories} = this.state;
        let email = formData.get('email');
        let userName = formData.get('userName');
        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');
        let password = formData.get('password');
        let phoneNumber = formData.get('phoneNumber');

        if(!email || !userName || !firstName || !lastName || !categories || categories.length == 0){
            swal("Please enter all the details");
            return;
        }

        let orgId = getOrganizationID();
        categories = categories.map((cat) => {
            return orgId+"_"+cat
        })
          await axios({
              method: 'post',
              url: config.rooturl+"/addAgent",       
              data: { "OrgId": orgId, "Email": email, "Username": userName, "FirstName" : firstName, 
              "LastName": lastName, "Categories": categories, "Password": password, "PhoneNumber": phoneNumber
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
                  swal(responseData.responseMessage).then((value) => window.location.reload(false))
                  this.handleClose()
              }).catch(function (err) {
                  swal("cannot add the agent")
                  console.log(err)
                  this.handleClose()
              });
    }

    removeCategory = (catName) =>{
        console.log("cat to be removed.."+catName)
        let categories = this.state.categories;
        let idx = categories.indexOf(catName);
        if(idx !== -1){
            categories.splice(idx, 1);
            this.setState({
                categories
            })
        }
    }

    renderCloseBtn =(name) =>{
        return (
            <button className="close" onClick={(evt) => {evt.preventDefault(); this.removeCategory(name)}}>
              &times;
             </button>
        )
    }

    renderNewCategories=()=>{
        let categories = this.state.categories
        categories = categories.map((cat,id)=>{
        return <div key={id} className="categoryCard"><span>{cat}</span> &nbsp; {this.renderCloseBtn(cat)}</div>
        })
        let arr = []
        let len = categories.length;
        for(let i=0; i<len; i = i+3){
        arr.push(<div className="categoryFlex" key={i}>
            {categories[i]}{i+1<len ? categories[i+1]:""}{i+2<len ? categories[i+2]:""}
        </div>)
        }
      return arr;
        //return (<div className="categoryFlex">{categories}</div>)
    }

    
    renderCategoryDropdown = () =>{
        let orgCategories = getOrgCategories();
        console.log("org categories are:", orgCategories)
        orgCategories = ["", ...orgCategories]
        orgCategories = orgCategories.map((cat, id)=>{
            return (
                <option value={cat} key={id}> {cat}</option>
            )
        })
        return orgCategories
    }

    render(){
        return(
            <>
            <Button variant="info" onClick={this.handleShow}>
                Add an Agent
            </Button>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Agent Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="input" onSubmit = {this.submitHandler}>
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
                        <Form.Control name="password" placeholder="Password"  />
                        </Form.Row>
                        <br/>
                        <Form.Row>
                        <Form.Control name="phoneNumber" placeholder="Phone Number"  />
                        </Form.Row>
                        <br/>
                        <Form.Row>
                        <Form.Control name="email" placeholder="Email"  />
                        </Form.Row>
                        <br/>
                        
                       <Form.Row>
                            <span>Category</span>&nbsp;
                            <select name ="category" value={this.state.currCategoryVal} onChange={this.dropdownChangeHandler} class="form-control halfWidth">
                                {this.renderCategoryDropdown()}
                            </select>
                           &nbsp; &nbsp; &nbsp; &nbsp;
                            <Button className="btn btn-info" onClick={this.updateCategoryInState}>Add</Button>
                       </Form.Row>
                        <br/>

                        <Form.Row>
                            <Col>{this.renderNewCategories()}</Col>
                        </Form.Row>
                        <br/>
                        <Button type="submit" className="btn btn-info btn-block mt-4" >Add Agent</Button>
                        
    
                    </Form>
                </Modal.Body>
            </Modal>
            </>
        )
    }

}

export default AgentsList