import React, { Component } from "react";
import axios from "axios";
import {
    Button,
    Form
  } from "react-bootstrap";
import swal from "sweetalert";
import "../css/customer.css";

const {getUserType, getCustomerId, getCustomerName}  = require('./utils.js');
const config = require("../config/settings");
  
class AddCustomerMessage extends Component{
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
        let userId = getCustomerId();
        let userName = getCustomerName();

        //axios.defaults.withCredentials = true;
        let url = config.rooturl+'/addMessage/';
        let {messageText} = this.state;
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
                this.props.getHistory();
                  swal("Message is added").then((val) =>  {
                      //this.props.changeActiveKey("history")
                      this.props.handleClose()
                    });
                  this.setState({
                      messageText:""
                  })
              } else {
                  swal("Message cannot be added");
                  console.log("message cannot be added")
              }
              
          }).catch(function (err) {
              swal("Message cannot be added");
              console.log(err)
          });

    }
    
    render(){
      return (
          <Form className = "addMessage">
          <Form.Group controlId="addmessage">
              <Form.Control type="text" as="textarea" className = "messageTextArea"  value={this.state.messageText} placeholder="Add Comment" onChange={this.changeHandler}/>
          </Form.Group>
          <Button variant="info" className="float-right"  onClick = {this.submitHandler}>
              Submit
          </Button>
          <br/><br/>
          </Form>
        );
    }
}
export default AddCustomerMessage;