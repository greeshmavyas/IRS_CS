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
  import "../css/customer.css"
  const {getUserType, getUserId, getUserName}  = require('./utils.js');
  const config = require("../settings.js");
/*
Format:
[
    {
        UserType:"",
        UserId:"",
        Message:""

    }
]
*/
  class Messages extends Component{
      //use message index as key while displaying
      constructor(props){
          super(props);
          const getVal = (val)=>{
              let arr = []
              if(val){
                  return val
              } else {
                  return arr
              }
          }
          this.state={
              messages:getVal(props.messages),
              caseId: props.caseId
          }
      }
      updateMessage = (newMessage) =>{
          console.log("newMessage:")
          console.log(newMessage)
          this.setState({
              messages:[ ...this.state.messages, newMessage]
          })
      }
      render(){
          if(this.state.messages && this.state.messages.length > 0){
              let arr = [];
              let {messages} = this.state;
              for(let i=messages.length-1; i>=0; i--){
                  let currMessage = messages[i];
                  arr.push(<MessageComponent key={i} index={i} message={currMessage}/>)
              }
            return (<div className="panel"> 
                <AddMessage updateMessage={this.updateMessage} caseId = {this.state.caseId}/>
                <div className="allMessages">{arr}</div>
                </div>)
          } else {
              return  <AddMessage updateMessage={this.updateMessage} caseId = {this.state.caseId}/>
          }
      }
  }
 
  class MessageComponent extends Component{
      render(){
          let {message,index} = this.props
          return(
              <Card key = {index} className="messageComponent">
                  <Row>
                      <Col><b>{message.UserName}({message.UserID},{message.UserType})</b></Col>
                      <Col><span className="float-right">{message.TimeStamp}</span></Col>
                  </Row>
                  <Row>
                      <Col>{message.Message}</Col>
                  </Row>
              </Card>
          )
      }
  }

  class AddMessage extends Component{
      constructor(props){
          super(props);
          this.state={
              messageText: "",
              caseId: props.caseId
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
          let userId = getUserId();
          let userName = getUserName();

          //axios.defaults.withCredentials = true;
          let url = config.rooturl+'/addMessage/';
          let data = {
              "message" : this.state.messageText,
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
                    console.log("message added");
                    this.props.updateMessage({
                        Message: this.state.messageText,
                        UserType: userType,
                        UserName: userName,
                        UserID: userId,
                        CaseID: caseId
                    })
                    this.setState({
                        messageText:""
                    })
                } else {
                    console.log("message cannot be added")
                }
                
            }).catch(function (err) {
                console.log(err)
            });

      }
      render(){
        return (
            <Form className = "addMessage">
            <Form.Group controlId="addmessage">
                <Form.Control type="text" as="textarea" className = "messageTextArea" placeholder="Add Comment" onChange={this.changeHandler}/>
            </Form.Group>
            <Button variant="info" className="float-right"  onClick = {this.submitHandler}>
                Submit
            </Button>
            <br/><br/>
            </Form>
          );
      }
  }

  export default Messages;