import React, {Component} from 'react';
import axios from 'axios';
import { getOrganizationID, addOrgId, removeOrgId } from './utils.js'
import {Button, Card, Form, Col, Row, Table, Container} from 'react-bootstrap'
import  config from '../config/settings'
import NavbarDash from "./NavbarDash";
import Sidebar from './Sidebar'
import swal from 'sweetalert';

class OrgDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            orgDetails: props.orgDetails,
            newCategories: [],
            currCategoryVal: "",
            orgCategories: props.orgDetails.Categories
        }
    }

    componentDidMount(){
       
    }

    categoryChangeHandler = (evt)=>{
        this.setState({
            currCategoryVal: evt.target.value
        })
    }
    updateCategoryInState =()=>{
        let {newCategories, currCategoryVal, orgCategories} = this.state 
        //currCategoryVal  = getOrganizationID()+"_"+currCategoryVal;
        currCategoryVal = addOrgId(currCategoryVal);
        if(newCategories.indexOf(currCategoryVal) !== -1 || orgCategories.indexOf(currCategoryVal) !== -1){
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

    submitCategories = () =>{
        let {newCategories} = this.state
        if(!newCategories || newCategories.length == 0){
            swal("Please enter new categories");
            return;
        }
        let data = {
            OrgID: getOrganizationID(),
            Category: newCategories
        }
        axios({
            method: 'put',
            url: config.rooturl + '/org/category',
            data: data
          })
            .then(response => {
              console.log(response)
              console.log("Status Code : ", response.status);
              console.log("Response fromcategory addition")
              console.log(response.data);
      
              if (response.data && response.data.responseMessage) {
                  swal(response.data.responseMessage)
                  this.setState({
                      orgCategories: [...this.state.orgCategories, ...newCategories],
                      newCategories:[]
                  })
                  localStorage.setItem("orgCategories",this.state.orgCategories);
              }

            }).catch(error => {
              console.log(error);
            })
    }

    render(){
        if(this.state.orgDetails){
            let categories = this.state.orgCategories
            let catStr = "";
            for(let cat of categories){
                catStr = catStr + removeOrgId(cat) +" ,"
            }
            if(catStr.charAt(catStr.length-1) == ',')
                catStr = catStr.substr(0,catStr.length-1);
            let {orgDetails} = this.state;

            return (
                <div>
                     <NavbarDash />
                         <div className="row">
                            <div className="col-2">
                            <Sidebar />
                            </div>
                        </div>
                        
                        <div className="container col-8" style={{ width: '25rem' }}>
                            
                            <h4> Organization Details</h4>
                           
                            <br></br>
                            <div >
                            <Table borderless >
                                <tbody>
                                    <tr>
                                        <td>Organisation Name:</td>
                                        <td>{orgDetails.OrgName}</td>
                                    </tr>
                                    <tr>
                                        <td>Domain:</td>
                                        <td>{orgDetails.Domain}</td>
                                    </tr>
                                    <tr>
                                        <td>Categories:</td>
                                        <td>{catStr}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            </div>
                            <Container>
                            <Row>
                                <Col>
                                <Form.Control placeholder="Add Category" name="categoryVal" onChange={this.categoryChangeHandler} value={this.state.currCategoryVal}/>
                                </Col>
                                <Col>
                                <Button className="btn btn-info" onClick={this.updateCategoryInState}>Add</Button>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                            <Col>{this.renderNewCategories()}</Col>
                            </Row>
                            </Container>
                            <br/>
                            <Col><Button className="btn btn-info btn-block" onClick = {this.submitCategories}>Submit</Button></Col>
                        </div>
                </div>
                )
        } else {
            return <div></div>
        }
    }
}
export default OrgDetails