import React, { Component } from "react";
import '../css/home.css';
import CustomerNavbarLogin from './CustomerNavbarLogin';

class Home extends Component {
    render() {
        return (
            <div  style={{height: "100%"}}>
                <CustomerNavbarLogin style={{height: "10%"}}/>
            </div>
        );
    }
}

export default Home;