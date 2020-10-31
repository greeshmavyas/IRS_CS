import React, { Component } from 'react';
import axios from "axios";
import NavbarDash from "./NavbarDash";
import {Botton, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Sidebar from './Sidebar'
import config from '../config/settings'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

 class Dashboard extends Component {
   constructor() {
     super();
     this.state = {
       allCases: {},
       viewcase: null,
       modal: false,
       mstatus: "open",
       flag : false
     };
     
   }

   showModal = () => {
     console.log("hello");
     this.setState({
       modal: !this.state.modal,
     });
   };
   showModal1 = (viewcase) => {
       console.log("hello1");
     this.setState({
       modal: !this.state.modal,
       viewcase: viewcase,
     });
   };

   handleStatusChange = (modalstatus) => {
       this.setState({
           mstatus:modalstatus
       })
   }

   async componentDidMount() {
     console.log("in get all cases frontend")

     let agentID = localStorage.getItem("agentID");
     let organisationID = localStorage.getItem("organisationID")
     
      axios.defaults.withCredentials = true;
      let data = {
            agentID: agentID,
            organisationID: organisationID
        };
     console.log("data is..")
     console.log(data);

     axios({
      method: 'get',
      url: 'http://' + config.hostname + ':' + config.backendPort + '/getCases',
      params: data,
    })
       .then((response) => {
         console.log("response from getCases")
         console.log(response)

         if(response.status === 200){
          let receivedCases = response.data.cases;
          console.log("received cases")
          console.log(response.data.cases)
          if(receivedCases){
            this.setState({ allCases: receivedCases, flag: true });
          }else{
            this.setState({ allCases: {} });
          }
         }
         else{
           this.setState({allCases : {}});
         }
         
       })
       .catch(error => {
        console.log(error);
        this.setState({allCases : {}})
      })
   }

   render() {
     const closeBtn = (
       <button className="close" onClick={() => this.showModal()}>
         &times;
       </button>
     );
     var casedetails, mytextvar;
     var maxlimit = 10
     if (this.state.flag) {
       casedetails = this.state.allCases.map((ticket) => {
         return (
          <div>
            <div onClick={() => this.showModal1(ticket)} >
            <Card>
              <Card.Body>
                <table>
                  <tbody >
                    <tr >
                      <td style = {{width: '10rem'}}> ID: {ticket.CaseID}</td>
                      <td style = {{width: '15rem'}}>Status: {ticket.Status}</td>
                      <td style = {{width: '50rem'}}>{ticket.Information} </td>
                    </tr>
                  </tbody>
                </table>
              </Card.Body>
            </Card>
            </div>
          </div>
         );
       });
     }
     return (
       <div>
         <NavbarDash />
         <div className= "row">
           <div className="col-2">  
                  <Sidebar/></div>
         <div className="container col-9">
           {this.state.allCases.length > 0 ? (
             <div className="col-10">
               {casedetails}
               {this.state.viewcase != null ? (
               
                 <Modal
                   isOpen={this.state.modal}
                   toggle={() => this.showModal()}
                   className="modal-popup-lg"
                   scrollable
                 >

                <Modal.Dialog>
                 <Modal.Header closeButton>
                   <Modal.Title>Case Details</Modal.Title>
                 </Modal.Header>
               
                 <Modal.Body>
                   <p> Information : {this.state.viewcase.Information}</p>
                   <p> Resolution Comments : {this.state.viewcase.ResolutionComments}</p>
                 </Modal.Body>
               
                 <Modal.Footer>
                   <Button variant="secondary">Close</Button>
                   <Button variant="primary">Save changes</Button>
                 </Modal.Footer>
               </Modal.Dialog>
              
              </Modal>
                  ) : null}
             </div>
           ) : (
             <div>
               <h4 style={{ margin: "3em" }}>No new cases to display!</h4>
             </div>
           )}
         </div>
         
         </div>
       </div>
     );
   }
 }

export default Dashboard;
