import React, { Component } from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';


class HomeRight extends Component {
    render() {
        return (
            <Card className="bg-primary">
               <Row>
                   <Col className="col-5 offset-md-1">
                    <Button className="btn btn-info" style={{width: "100%"}} > Login as a Customer</Button>
                   </Col>
               </Row>
               <Row>
                   <Col className="col-5 offset-md-1">
                    <Button className="btn btn-info" style={{width: "100%"}}> Login as an Agent</Button>
                   </Col>
               </Row>
               <Row>
                   <Col className="col-5 offset-md-1">
                    <Button className="btn btn-info" style={{width: "100%"}}> Login as an Organization owner</Button>
                   </Col>
               </Row>
            </Card>
        );
    }
}
export default HomeRight;