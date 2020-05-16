import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';


class CaseLeft extends Component {
    render() {
        return (
            <div style={{color: "white", height: "100%"}}>

                <div className="bg-dark" style={{ height: "30%"}}>
                    
                
           
                </div>


                <div className="bg-dark" style={{color: "white", height: "40%", "textAlign" : "center"}}>
                    
                    <h1>
                        Intelligent Routing system, an automated tool to solve customer issues efficiently and quickly.
                    </h1>
                
           
                </div>

                <div className="bg-dark" style={{ height: "30%"}}>
                   
                    
                    <Col className = "col-3 offset-md-5">
                    <button className="btn btn-primary">Create a case</button>
                    </Col>
                   
                </div>

            </div>
            
        );
    }
}

export default CaseLeft;