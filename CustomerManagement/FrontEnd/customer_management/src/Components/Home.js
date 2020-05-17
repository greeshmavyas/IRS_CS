import React, { Component } from "react";
import { Row, Col, Link } from 'react-bootstrap';
import '../css/home.css';
import NavbarLogin from './NavbarLogin';

//import HomeLeft from './HomeLeft';
//import HomeRight from './HomeRight';
import Header from "./Header";

class Home extends Component {
    render() {
        return (
            <div  style={{height: "100%"}}>
                <NavbarLogin style={{height: "10%"}}></NavbarLogin>
                
                
                
            </div>
        );
    }
}

export default Home;