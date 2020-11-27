import React, { Component } from "react";
import '../css/home.css';
import CustomerNavbarLogin from './CustomerNavbarLogin';
import parentWebsiteImage from './images/ParentWebsite.png';

class Home extends Component {
    render() {
        return (
            <div  style={{height: "100%"}}>
                <CustomerNavbarLogin style={{height: "10%"}}/>
                <div className="pull-right">
                      <img
                      style={{marginLeft:"400px", marginTop:"90px", height:"45%", width: "45%", align: "center"}}
                        alt="Thumbnail View of parent website"
                        className="img-responsive uploadImgItem"
                        src={parentWebsiteImage}
                      />
                    </div>
            </div>
        );
    }
}

export default Home;