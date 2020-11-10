import React, { Component } from 'react';
import axios from "axios";
import NavbarDash from "./NavbarDash";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Sidebar from './Sidebar'
import config from '../config/settings'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'
import { stat } from 'fs';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      allCases: [],
      matchedCases: [],
      viewcase: null,
      modal: false,
      mstatus: "open",
      flag: false,
      selectOptions: [],
      status: "",
      paginationActive: 1,

    };

  }
  onClickPaginationItem = (e, number) => {
    e.preventDefault();
    // console.log('clicked an item');
    this.setState({
      paginationActive: number,
    })
  }
  
  handleChange = (e) => {
    let status = e.target.value;
    let allCases = this.state.allCases;
    let matchedCases = [];
    if (status == "") {
      matchedCases = allCases;
      status = "";
    } else {
      for (var i = 0; i < allCases.length; i++) {
        if (allCases[i].Status == status) {
          matchedCases.push(allCases[i]);
        }
      }
    }

    this.setState({
      status: status,
      matchedCases: matchedCases,
    });
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
      mstatus: modalstatus
    })
  }

  async componentDidMount() {
    console.log("in get all cases frontend")

    let agentID = localStorage.getItem("agentID");
    let organisationID = localStorage.getItem("organisationID")
    let count = 0
    axios.defaults.withCredentials = true;
    if (agentID) {
      count = count + 1
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

          if (response.status === 200) {
            let receivedCases = response.data.cases;
            console.log("received cases")
            console.log(response.data.cases)
            if (receivedCases) {

              this.setState({
                allCases: receivedCases,
                flag: true,
              });


              const data = this.state.allCases

              const options = data.map(d => ({
                "value": d.Status,
                "label": d.Status
              }))
              this.setState({ selectOptions: options })
              console.log("options")
              console.log(this.state.selectOptions)

            } else {
              this.setState({ allCases: {} });
            }
          }
          else {
            this.setState({ allCases: {} });
          }

        })
        .catch(error => {
          console.log(error);
          this.setState({ allCases: {} })
        })


    }
    else if (count < 1) {
      window.location.reload();
    }
  }


  render() {
    console.log("status");
    console.log(this.state.status);
    const closeBtn = (
      <button className="close" onClick={() => this.showModal()}>
        &times;
       </button>
    );

    var casedetails;
    let searchResults;
    let status = this.state.status; 
    if (status == "") {
      searchResults = this.state.allCases;
    } else {
      searchResults = this.state.matchedCases;
    }

    let index = 0;
    let maxResultsPerPage = 2;
    let active = this.state.paginationActive;     // Initially active key
    let startIndex = 0 + (active - 1) * maxResultsPerPage;
    let endIndex = startIndex + maxResultsPerPage;


    // Pagination
    let items = [];     // 
    for (let number = 1; number <= Math.ceil(searchResults.length / maxResultsPerPage); number++) {
      let isActive = (number === active);
      items.push(
        <Pagination.Item key={number} active={isActive} onClick={(e) => {
          this.onClickPaginationItem(e, number)
        }}>
          {number}
        </Pagination.Item>,
      );
    }

    const paginationBasic = (
      <div>
        <Pagination>{items}</Pagination>
      </div>
    );

    searchResults = searchResults.slice(startIndex, endIndex);

    if (this.state.flag) {
      casedetails = searchResults.map((ticket) => {
          return (
            <div>
              <div onClick={() => this.showModal1(ticket)} >
                <Table>
                  <tbody >
                    <tr >
                      <td style={{ width: '10rem' }}>{ticket.CaseID}</td>
                      <td style={{ width: '15rem' }}>{ticket.Status}</td>
                      <td style={{ width: '50rem' }}>{ticket.Information} </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          );
      });
    }

    return (
      <div>
        <NavbarDash />
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="container col-9">

            <div className="filter-item">
              {this.state.allCases.map(function (item) {
                return (
                  <div>{item.name}</div>
                );
              })}
            </div>
            <div>
              Filter by Status: < nbsp />
              <select id="Status" value={this.state.status} onChange={this.handleChange}>
                <option value="">All Cases</option>
                <option value="Assigned">Assigned</option>
                <option value="InProgress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <Table>
              <tr>
                <th style={{ width: '10rem' }}>ID</th>
                <th style={{ width: '15rem' }}>Status</th>
                <th style={{ width: '50rem' }}>Details</th>
              </tr>
            </Table>

            {this.state.allCases.length > 0 ? (
              <div className="col-10">
                {casedetails}
                {paginationBasic}
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
                      Case Details
                   </ModalHeader>
                    <ModalBody className="modal-body">
                      <div className=" row form-group">
                        <p className="font-weight col-7">
                          Information : {this.state.viewcase.Information}
                        </p>
                      </div>
                      <div className="form-group">
                        <p className="font-weight-bold">
                          Resolution Comments : {this.state.viewcase.ResolutionComments}
                        </p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
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
      </div>
    );
  }
}

export default Dashboard;
