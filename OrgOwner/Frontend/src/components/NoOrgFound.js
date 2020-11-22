import React, {Component} from 'react';
import {Button, Nav, Container, Col, Row} from 'react-bootstrap'

import NavbarDash from "./NavbarDash";
import Sidebar from './Sidebar'

class NoOrgFound extends Component{

    render(){
        return (
            <div>
                <NavbarDash />
                    <div className="row">
                    <div className="col-2">
                    <Sidebar />
                    </div>
                </div>
                <Container>
                    <Row><Col className="offset-md-5"><h4>No Organization Found</h4></Col></Row>
                    <Row>
                        <Col className="col-3 offset-md-5">
                            <Nav.Link href="/OrgRegistration">
                                <Button className="btn btn-info btn-block mt-2">Register Organization</Button>
                            </Nav.Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default NoOrgFound