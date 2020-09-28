import React, { Component } from "react";
import { Row, Col, Link } from 'react-bootstrap';
import '../css/home.css';

import CaseLeft from './CaseLeft';
//import HomeRight from './HomeRight';
import Header from "./Header";

class CasePage extends Component {
    render() {
        return (
            <div  style={{height: "100%"}}>
                <Header style={{height: "10%"}}></Header>
                <CaseLeft style={{height: "90%"}}/>
                
                
            </div>
        );
    }
}

export default CasePage;