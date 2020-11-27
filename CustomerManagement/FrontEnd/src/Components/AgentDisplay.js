import React, { Component } from "react";
import axios from "axios";
import {
    Button,
    Table,
    Form, Row, Col
  } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
//import '../css/customer.css';
import {} from "./utils.js";
import swal from 'sweetalert'
import { addOrgId, removeOrgId } from './utils.js'

const config = require("../config/settings");

class AgentDisplay extends Component{
    constructor(props){
        super(props);
       
        this.state={
            agentDetails: props.agentDetails,
            agentId:"",
            show:false,
            currCategoryVal : "",
            firstName:props.agentDetails ? props.agentDetails.FirstName : "",
            lastName:props.agentDetails ? props.agentDetails.LastName : "",
            email:props.agentDetails ? props.agentDetails.Email : "",
            phoneNumber:props.agentDetails ? props.agentDetails.PhoneNumber : "",
            agentCategories: props.agentDetails ? props.agentDetails.Categories : "",
            newCategories: []
        }
    }


    handleClose = () => {this.setState({show:false, currCategoryVal:""}); };

    onChange = (evt) =>{
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    categoryChangeHandler = (evt)=>{
        this.setState({
            currCategoryVal: evt.target.value
        })
    }

    updateCategoryInState =()=>{
        let {newCategories, currCategoryVal, agentCategories} = this.state 
        if(!currCategoryVal){
            swal("Please enter category value")
            return;
          }
          
        currCategoryVal = addOrgId(currCategoryVal);
        if(newCategories.indexOf(currCategoryVal) !== -1 || agentCategories.indexOf(currCategoryVal) !== -1){
            swal("Category already exists")
            this.setState({
              currCategoryVal: ""
            })
        } else {
            //console.log(this.state.newCategories)
            this.setState({
                newCategories: [...newCategories, currCategoryVal],
                currCategoryVal: ""
            })
        }
    }

    updateHandler = async (evt)=>{
        evt.preventDefault();
        var formData = new FormData(evt.target);
        axios.defaults.withCredentials = true;
        let userName = this.state.agentDetails.Username;
        let {firstName, lastName, email, phoneNumber, newCategories} = this.state;
        if(!email || !userName || !firstName || !lastName || !phoneNumber){
            swal("Please enter all the details");
            return;
        }
        await axios({
            method: 'put',
            url: config.rooturl+"/org/agent",       
            data: { "Username":userName, "Email": email, "FirstName" : firstName, 
            "LastName": lastName, "PhoneNumber": phoneNumber, "Categories": newCategories
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
                swal(responseData.responseMessage).then((val)=>{window.location.reload(false); this.handleClose()})
                
            }).catch( (err) =>{
                swal("cannot update the agent").then((val)=>{window.location.reload(false); this.handleClose()})
                console.log(err)
            });

    }

    renderCloseBtn =(name) =>{
        return (
            <button className="close" onClick={() => this.removeCategory(name)}>
              &times;
             </button>
        )
    }

    removeCategory = (catName) =>{
        console.log("cat to be removed.."+catName)
        let newCategories = this.state.newCategories;
        let idx = newCategories.indexOf(catName);
        if(idx !== -1){
            newCategories.splice(idx, 1);
            this.setState({
                newCategories: newCategories
            })
        }
    }

    renderNewCategories=()=>{
        let newCategories = this.state.newCategories
        newCategories = newCategories.map((cat,id)=>{
        return <div key={id} className="categoryCard"><span>{removeOrgId(cat)}</span> &nbsp; {this.renderCloseBtn(cat)}</div>
        })
        let arr = []
        let len = newCategories.length;
        for(let i=0; i<len; i = i+2){
        arr.push(<div className="categoryFlex" key={i}>{newCategories[i]}{i+1<len ? newCategories[i+1]:""}</div>)
        }
        return arr;
    }


    render(){
        let {agentDetails} = this.state;
        const closeBtn = (
         <button className="close" onClick={() => this.props.showModal()}>
           &times;
          </button>
       );

       let categories = this.state.agentCategories
       let catStr = "";
       for(let cat of categories){
           catStr = catStr + removeOrgId(cat) +" ,"
       }
       if(catStr.charAt(catStr.length-1) == ',')
           catStr = catStr.substr(0,catStr.length-1);

       if(agentDetails ){
        return (
            
              <Modal  
              isOpen={this.props.modal}
              toggle={() => this.props.showModal()}
              className="modal-md"
              scrollable>
                <ModalHeader
                      toggle={() => this.props.showModal()}
                      close={closeBtn}
                    >
                    <span>Agent Details</span>
                </ModalHeader>
                <ModalBody>
                <Form className="input" onSubmit = {this.updateHandler}>
                    <Table borderless>
                        <tbody>
                            <tr>
                                <td>User Name</td>
                                <td>{agentDetails.Username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td><Form.Control name="email" placeholder="Email" defaultValue={agentDetails.Email} onChange={this.onChange}/></td>
                            </tr>
                            <tr>
                                <td>First Name</td>
                                <td><Form.Control name="firstName"  defaultValue={agentDetails.FirstName} onChange={this.onChange}/></td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td> <Form.Control name="lastName" defaultValue={agentDetails.LastName} onChange={this.onChange} /></td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td><Form.Control name="phoneNumber" placeholder="Phone Number" defaultValue={agentDetails.PhoneNumber} onChange={this.onChange} /></td>
                            </tr>
                            <tr>
                                <td>Categories</td>
                                <td>{catStr}</td>
                            </tr>
                            <tr>
                                <td> <Form.Control placeholder="Add Category" name="categoryVal" onChange={this.categoryChangeHandler} value={this.state.currCategoryVal}/></td>
                                <td><Button className="btn btn-info" onClick={this.updateCategoryInState}>Add</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Row>
                        <Col>{this.renderNewCategories()}</Col>
                    </Row>
                    <Button type="submit" className="btn btn-info btn-block mt-4" >Update Agent</Button>
                    </Form>
                    <br></br>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </Modal>
          )
        }

    }
}

export default AgentDisplay;