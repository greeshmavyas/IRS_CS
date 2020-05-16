import React, { Component } from "react";
import { Row, Col, Link } from 'react-bootstrap';
import logo from '../logo.svg';

class Header extends Component{
    render(){
        return(
            <Row className= "bg-dark homeComponent" >
               
                   
                <Col xs="1">
                </Col>
                <Col xs="7">
                </Col>
                <Col xs="1" style={{ paddingTop: "10px"}}>
                    <a href= "/home" className="text-light">Home</a>
                </Col>
                <Col xs="1" style={{ paddingTop: "10px"}}>
                    <a href= "/cases" className="text-light">Cases</a>
                </Col>
                <Col xs="1" style={{ paddingTop: "10px"}}>
                    <a href= "#" className="text-light">About us</a>
                </Col>
                <Col xs="1" style={{ paddingTop: "10px"}}>
                    <a href="#" className="text-light">Help</a>
                </Col>
        

            </Row>
        );
    }
}

export default Header;