import React, { Component,useState } from "react";
import axios from "axios";
import {
    Button,
    Modal,
    Row,
    Col,
    Container,
    Tabs,
    Tab,
    Form,
    Card
  } from "react-bootstrap";
  import "../css/agent.css"
import { getAgentId } from "./utils";
import swal from 'sweetalert'
  const {getUserType, getUserId, getUserName}  = require('./utils.js');
  const config = require("../config/settings.js");


class AddAgentMessage extends Component{
    constructor(props){
        super(props);
        this.state={
            messageText: "",
            caseId: props.caseId,
        }
    }
    changeHandler = (evt) =>{
        this.setState({
          messageText: evt.target.value
        })
    }
    submitHandler = () =>{
        let userType = getUserType();
        let {caseId} = this.state;
        let userId = getAgentId();
        let userName = getUserName();
        console.log(" befor props")
        console.log(this.props)
        this.props.updateStatus();
        let {messageText} = this.state;
          if(messageText){
               //axios.defaults.withCredentials = true;
                let url = config.rooturl+'/agentAddMessage/';
            
                let data = {
                    "message" : messageText,
                    userId,
                    caseId,
                    userType,
                    userName
                }
                axios({
                method: 'post',
                url,
                data,
                config: { headers: { 'Content-Type': 'application/json' } },
            })
                .then((response) => {
                    if (response.status >= 500) {
                        throw new Error("Bad response from server");
                    }
                    return response.data;
                })
                .then((responseData) => {
                    if(responseData.status){
                        console.log("Comment added");
                        this.props.getHistory()
                        swal("Comment is added successfully").then((val)=>{this.props.changeActiveKey("history")});
                        this.setState({
                            messageText:""
                        })
                    } else {
                        swal("Cannot add comment");
                        console.log("Comment cannot be added")
                    }
                }).catch(function (err) {
                    console.log(err)
                });
          }
       

    }
    render(){
      return (
          <Form className = "addMessage">
          <Form.Group controlId="addmessage">
              <Form.Control type="text" as="textarea" className = "messageTextArea" placeholder="Add Comment" value={this.state.messageText} onChange={this.changeHandler}/>
          </Form.Group>
          <Button variant="info" className="float-right"  onClick = {this.submitHandler}>
              Submit
          </Button>
          <br/><br/>
          </Form>
        );
    }
}
export default AddAgentMessage