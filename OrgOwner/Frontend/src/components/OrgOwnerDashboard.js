import React, { Component } from "react";
import NavbarDash from "./NavbarDash";
import Sidebar from './Sidebar'

class OrgOwnerDashboard extends Component{
    render(){
        return(
            <div>
                <NavbarDash />
                <div className="row">
                    <div className="col-2">
                    <Sidebar />
                    </div>
                </div>
          </div>
        )
    }
}
export default OrgOwnerDashboard