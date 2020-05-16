import React, { Component } from 'react';
import axios from "axios";
import NavbarDash from "./NavbarDash";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


 class Dashboard extends Component {
   constructor() {
     super();
     this.state = {
       cases: [],
       viewcase: null,
       modal: false,
       mstatus: "open"
     };
     //this.onChange = this.onChange.bind(this);
     //this.onSubmit = this.onSubmit.bind(this);
   }

   showModal = () => {
     console.log("hello");
     this.setState({
       modal: !this.state.modal,
       //events: this.state.events
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
     await axios("/getcases", {
       method: "get",
       config: { headers: { "Content-Type": "application/json" } },
     })
       .then((res) => {
         this.setState({ cases: res.data });
         console.log("THESE ARE CASES ", this.state.cases);
       })
       .catch((error) => console.log(error.response.data));
   }

   render() {
     const closeBtn = (
       <button className="close" onClick={() => this.showModal()}>
         &times;
       </button>
     );
     var casedetails;
     if (this.state.cases !== null) {
       casedetails = this.state.cases.map((cas) => {
         return (
           <div className="col w-75" id="casescard">
             <div className="card">
               <div className="card-body">
                 <div className="row">
                   <h5 className="card-title col-7">UserID:{cas.UserID}</h5>
                   {/* <div className="col-6"></div> */}
                   <div className="col-3">
                     <button
                       type="button"
                       className="btn btn-outline-success"
                       onClick={() => this.showModal1(cas)} //changed this.showmodal
                     >
                       View Details
                     </button>
                   </div>
                 </div>
                 <p className="card-text">
                   <strong>CaseID:{cas.CaseID}</strong>,{" "}
                 </p>
                 <p className="card-text">
                   <strong>Category:{cas.Category}</strong>
                 </p>
                 {/* <p className="card-text">
                   <strong>Information: {cas.Information}</strong>
                 </p> */}
                 <p className="card-text">
                   <strong>Status: </strong>
                   <strong>{cas.Status}</strong>
                   {/* <strong> Application Deadline : </strong>
                  <strong></strong> */}
                 </p>

                 <p className="card-text">
                   <strong>Resolution Comments : </strong>
                   {cas.ResolutionComments}
                 </p>
                 <p className="card-text">
                   <strong>Agent Id: {cas.AgentID}</strong>
                 </p>
                 <div className="col-10"></div>
                 {/* <a
                 href="/studentApplyJob"
                 className="btn btn-primary"
                 onClick={this.apply(job.job_id)}
               >
                 Apply
               </a> */}
                 {/* <button
                   type="button"
                   className="btn btn-primary"
                   onClick={() => this.showModal11(job)} //changed this.showmodal1
                 >
                   Apply
                 </button> */}
               </div>
             </div>
           </div>
         );
       });
     }
     return (
       <div>
         <NavbarDash />
         <div className="container">
           {this.state.cases.length > 0 ? (
             <div className="col-10">
               {casedetails}
               {this.state.viewcase != null ? (
                 <Modal
                   isOpen={this.state.modal}
                   toggle={() => this.showModal()}
                   className="modal-popup-lg"
                   scrollable
                 >
                   <ModalHeader
                     toggle={() => this.showModal()}
                     close={closeBtn}
                   >
                     EventDetails
                   </ModalHeader>
                   <ModalBody className="modal-body">
                     <div className=" row form-group">
                       <p className="font-weight-bold col-7">
                         Information:{this.state.viewcase.Information}
                       </p>
                       <div className="col-3">
                        <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               {this.state.mstatus}</button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button onClick={() => this.handleStatusChange("Working")} class="dropdown-item" >Working</button>
                                <button onClick={() => this.handleStatusChange("Resolved")}  class="dropdown-item" >Resolved</button>
                                <button  onClick={() => this.handleStatusChange("Postponed")}class="dropdown-item" >Postponed</button>
                            </div>
                       </div>
                     </div>
                     <div className="form-group">
                       <p className="font-weight-bold">
                         Resolution Comments:
                         {this.state.viewcase.ResolutionComments}
                       </p>
                       
                     </div>
                     <div className="form-group">
                       <p className="font-weight-bold">
                         Agent ID: {this.state.viewcase.AgentID}
                       </p>
                     </div>
                   </ModalBody>
                   <ModalFooter>
                     {/* <Button
                        color="secondary"
                        onClick={() => this.showModal()}
                      >
                        Cancel
                      </Button> */}
                   </ModalFooter>
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
     );
   }
 }

export default Dashboard;
