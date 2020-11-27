import React, { Component } from 'react';
import axios from "axios";
import CustomerNavbarDash from "./CustomerNavbarDash";
import config from '../config/settings'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import {getCustomerOrgId, getCustomerId} from './utils'
import CustomerCaseDisplay from './CustomerCaseDisplay'
import CreateCaseModal from './CreateCaseModal'

class CustomerDashboard extends Component {
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
      isLoading: true
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

   
    axios.defaults.withCredentials = true;
    let customerId = getCustomerId();
  
    let organisationID = getCustomerOrgId()
    //let count = 0
    axios.defaults.withCredentials = true;
    if (customerId) {
      //count = count + 1
      let data = {
        customerId,
        organisationId : organisationID
      };
      console.log("data is..")
      console.log(data);

      axios({
        method: 'get',
        url: config.rooturl + '/customerDashboard',
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
              this.setState({ allCases: [] });
            }
          }
          else {
            this.setState({ allCases: [] });
          }
          debugger;
          this.setState({
            isLoading: false
          })
        })
        .catch(error => {
          console.log(error);
          debugger;
          this.setState({ 
            allCases: [] ,
            isLoading: false
          })
        })


    }
   /* else if (count < 1) {
      window.location.reload();
    }*/
  }


  render() {
    console.log("customer dashboard");
    console.log(this.state)
    debugger;
    if(this.state.isLoading){
      return <div><CustomerNavbarDash/></div>
    } else if(!this.state.allCases || this.state.allCases.length == 0){
      return (
        <div>
          <CustomerNavbarDash/>
          <div className="container col-9 flexBox offset-md-3" style={{ marginTop: "5em" }}>
          <h4 > { "No new cases to display!"}</h4> &nbsp; &nbsp; &nbsp;
          <CreateCaseModal/>
          </div>
        </div>
      )
    }
    console.log("status");
    console.log(this.state.status);
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
            <tr onClick={() => this.showModal1(ticket)}>
                  <td>{ticket.CaseID}</td>
                  <td>{ticket.CreatedOn}</td>
                  <td>{ticket.Status}</td>
                  <td>{ticket.Information} </td>
                </tr>
          );
      });
    }

    return (
      <div style ={ {height: '100%'}} >
        <CustomerNavbarDash />
        
          
          <div className="container col-9">

            <div className="filter-item">
              {this.state.allCases.map(function (item) {
                return (
                  <div>{item.name}</div>
                );
              })}
            </div>
            <div className="offset-md-3">
              Status: &nbsp; &nbsp;
              <select id="Status" value={this.state.status} onChange={this.handleChange}>
                <option value="">All</option>
                <option value="Assigned">Assigned</option>
                <option value="InProgress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <CreateCaseModal/>
            </div>
              <br></br>
            <div style={{ minHeight: '400px' }}>
              <Table striped bordered hover className="cursorPointer">
                <tr>
                  <th style={{ width: '10rem' }}>ID</th>
                  <th style={{ width: '10rem' }}>Date</th>
                  <th style={{ width: '15rem' }}>Status</th>
                  <th style={{ width: '50rem' }}>Details</th>
                </tr>
                <tbody>
                {casedetails}
                </tbody>
              </Table>
            </div>
            {this.state.allCases.length > 0 ? (
              <div className="col-10">
              
                {this.state.viewcase != null ? (
                  <div>
                  <CustomerCaseDisplay caseId = {this.state.viewcase.CaseID}
                  showModal = {this.showModal} modal = {this.state.modal} caseDetails={this.state.viewcase}/>
                 </div> ) : null}
                 
               <div className = "" style = { {  height: '15%',  display: "flex",justifyContent: "center",alignItems: "center"}}>
                 {paginationBasic}
                </div>
                
                 
                
                </div>
            ) : (
                <div>
                  <h4 style={{ margin: "3em" }}>
                    {this.state.isLoading ? "" : "No new cases to display!"}
                  </h4>
                </div>
              )}
              
              
          </div>
      </div>
    );
  }
}

export default CustomerDashboard;