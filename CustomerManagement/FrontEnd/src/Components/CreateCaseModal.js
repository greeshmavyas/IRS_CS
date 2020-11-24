import React, { Component } from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import {getCustomerId, getOrganisationId} from './utils';
const config = require("../config/settings");

class CreateCaseModal extends Component {
  state = {
    Category: "Others",
    Information: "",
    Response: "",
    show: false
  };

  handleClose = () =>{
    this.setState({
        show: false
    })
    window.location.reload(false)
  }

  handleShow = () =>{
    this.setState({
        show: true
    })
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    var cid = Math.floor(Math.random() * 10000);
    const data = {
      UserID: getCustomerId(),
      OrganisationID: getOrganisationId(),
      CaseID: cid.toString(),
      Category: this.state.Category,
      Information: this.state.Information,
      Status: "New",
      ResolutionComments: ""
    }

    axios
      .post(config.rooturl + "/add", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            Response: "Case Created Successfully CaseID: " + cid.toString(),
            Information: "",
          });
        }
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          message: "Can not create case",
        });
        console.log("Error is:", error);
      });

      //calling Lambda func to get category
      axios.get(config.awsLambda).then((response) => {
        console.log(response);
        if(response){
          const category = response;
          //TODO: call Kafka API

        }
      }).catch((error)=>{
        console.log(error);
      })
  };

  render() {
    return (
        <>
        <Button variant="info" onClick={this.handleShow}>
        Create case
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Case Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={this.submitHandler}>
                      <div className="form-group">
                        <strong>Information:</strong>
                        <textarea
                          type="text"
                          id="Information"
                          className="form-control form-control-lg"
                          placeholder="Information"
                          name="Information"
                          value={this.state.Information}
                          onChange={this.changeHandler}
                        />
                      </div>

                      <button className="btn btn-info btn-block mt-4">
                        Create
                      </button>

                      <br></br>
                      <br></br>
                    </form>

                    <h6>{this.state.Response}</h6>
                </Modal.Body>
            </Modal>
        </>
    );
  }
}
export default CreateCaseModal;
