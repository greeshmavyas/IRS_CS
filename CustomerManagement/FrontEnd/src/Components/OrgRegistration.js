import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import {Button, Card, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import config from '../config/settings'
import NavbarDash from "./NavbarDash";
import Sidebar from './Sidebar'
import {getOrgOwnerToken} from './utils';
import { Redirect } from 'react-router';
import swal from "sweetalert";

class OrgRegistration extends Component{

    constructor() {
        super();
        this.state = {
          orgName: "",
          domain: "",
         // caseCategories:"",
          registered:false,
          currCategoryVal:"",
          newCategories: []
        }
    }

    onChangeHandler = (e) => {
        var name= e.target.name
        var str = (e.target.value).toLowerCase()
        this.setState({
            [name]: str
        })
    }

    submitRegistration = (e) => {
        console.log("in submit org registration")
        let {orgName, newCategories, domain} = this.state;
        if(!orgName || !newCategories || !domain || newCategories.length == 0){
          swal("Please enter all the details");
          return;
        }

        const data = {
          //TODO: put orgownerId
          token : getOrgOwnerToken(),
          OrgName: orgName,
          Categories: newCategories,
          Domain: domain
        }
        console.log("data is..")
        console.log(data);
        e.preventDefault();
        axios.defaults.withCredentials = true;
    
        axios({
          method: 'post',
          url: config.rooturl + '/registerOrg',
          data: data,
        })
          .then(response => {
            console.log("Status Code : ", response.status);
            console.log("Response from Signup ")
            console.log(response.data);
    
            if (response.data && response.data.responseMessage && response.data.responseMessage.indexOf("Your organization is registered successfully") !== -1) {
              this.setState({
                registered: true
              })
              localStorage.setItem("orgId", response.data.org._id)
              localStorage.setItem("orgCategories", response.data.org.Categories);
              swal(response.data.responseMessage)
            } else {
              swal("Cannot register the organization")
            }
          }).catch(error => {
            console.log(error);
            this.setState({
              message : 'Cannot register Organization'
            })
          })
      }

    removeCategory = (catName) =>{
        console.log("cat to be removed.."+catName)
        let newCategories = this.state.newCategories;
        let idx = newCategories.indexOf(catName);
        if(idx !== -1){
            newCategories.splice(idx, 1);
            this.setState({
                currCategoryVal: "",
                newCategories: newCategories
            })
        }
    }

    categoryChangeHandler = (evt)=>{
        this.setState({
            currCategoryVal: evt.target.value
        })
    }

    updateCategoryInState =()=>{
        let {currCategoryVal, newCategories} = this.state
        if(!currCategoryVal){
          swal("Please enter category value")
          return;
        }
        
        if(newCategories.indexOf(currCategoryVal) !== -1){
          swal("Category already exists")
          this.setState({
            currCategoryVal: ""
          })
        } else {
          //console.log(newCategories)
          currCategoryVal = currCategoryVal.toLowerCase();
          this.setState({
              newCategories: [...newCategories, currCategoryVal],
              currCategoryVal: ""
          })
        }
        
    }
    
    renderCloseBtn =(name) =>{
      return (
          <button className="close" onClick={() => this.removeCategory(name)}>
            &times;
           </button>
      )
    }

    renderNewCategories=()=>{
      let newCategories = this.state.newCategories
      newCategories = newCategories.map((cat,id)=>{
      return <div key={id} className="categoryCard"><span>{cat}</span> &nbsp; {this.renderCloseBtn(cat)}</div>
      })
      let arr = []
        let len = newCategories.length;
        for(let i=0; i<len; i = i+2){
        arr.push(<div className="categoryFlex" key={i}>{newCategories[i]}{i+1<len ? newCategories[i+1]:""}</div>)
        }
      //return <div className="categoryFlex">{newCategories}</div>
      return arr;
    }

    render(){
      if(this.state.registered){
        return <Redirect to="/Organization" />
      } else {
        return(
          <div>
               <NavbarDash />
                       <div className="row">
                          <div className="col-2">
                          <Sidebar />
                          </div>
                      </div>
          
          <center>
          <div style={{ width: '25rem' }}>
            <div className="container">
              <div className="row">
                <div className="col-md-10 m-auto">
                  <br></br>
                  <h4>Organization Registration</h4>
                  <br></br>
                  <Form className="input">
                    <Form.Row>
                      
                      <Form.Control name="orgName" placeholder="Organization Name" onChange={this.onChangeHandler} />
                      </Form.Row>
                      <br/>
                      <Form.Row>
                      
                      <Form.Control name="domain" placeholder="Domain" onChange={this.onChangeHandler} />
                      </Form.Row>
                      <br/>

                      <Form.Row>
                      <Col>
                      <Form.Control placeholder="Category" name="categoryVal" onChange={this.categoryChangeHandler} value={this.state.currCategoryVal}/>
                      </Col>
                      <Col><Button className="btn btn-info" onClick={this.updateCategoryInState}>Add</Button></Col>    
                      </Form.Row>
                   
                  </Form>
                  <br></br>
                  <Form.Row>
                    <Col>{this.renderNewCategories()}</Col>
                  </Form.Row>
                  <Button className="btn btn-info btn-block mt-4" onClick={this.submitRegistration} >Register</Button>

                  
                </div>
              </div>
            </div>
          </div>
        </center>
        </div>
      )
      }
        
    }
}
export default OrgRegistration;