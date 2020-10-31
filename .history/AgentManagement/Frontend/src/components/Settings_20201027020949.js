import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import NavbarDash from "./NavbarDash";



export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
        show: true,
        contactNumber: '',
        password: '',
        isUser: true,
        updateDone: false,
    }
    this.updateProfile = this.updateProfile.bind(this);

    this.contactNumberChangeHandler = this.contactNumberChangeHandler.bind(this)
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
  }

  componentWillMount() {
    var agentID = localStorage.getItem("agentID");
    console.log("agentID  " + agentID)
    
//     if (buyerEmailId) {
//         console.log("able to read cookie");
//         let buyerName = cookie.load('cookie2');

//         console.log(buyerName);
//         this.setState({
//             buyerName: buyerName//,
//         });

//         axios({
//             method: 'get',
//             url: 'http://3.133.92.239:3001/buyerDetails',
//             params: { "buyerId": buyerId },
//             config: { headers: { 'Content-Type': 'application/json' } }
//         })
//             .then((response) => {
//                 if (response.status >= 500) {
//                     throw new Error("Bad response from server");
//                 }
//                 console.log(response);
//                 if (response.data == undefined) {
//                     console.log(response.data.responseMessage);
//                 }
//                 debugger
//                 let buyerDetails = response.data.buyerDetails;
//                 console.log("buyerDetails")
//                 console.log(buyerDetails)
//                 if (buyerDetails) {
//                     this.setState({
//                         buyerName: buyerDetails.buyerName,
//                         buyerPhone: buyerDetails.buyerPhoneNumber,
//                         buyerAddress: buyerDetails.buyerAddress,
//                         buyerEmailId: buyerDetails.buyerEmail,
//                     });
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//             });

//         axios({
//             method: 'get',
//             url: 'http://3.133.92.239:3001/profile/img',
//             params: { "id": buyerId, "table": "buyerTable" },
//             config: { headers: { 'Content-Type': 'application/json' } }
//         })
//             .then((response) => {
//                 if (response.status >= 500) {
//                     throw new Error("Bad response from server");
//                 }
//                 console.log(response);
//                 return response.data;
//             })
//             .then((responseData) => {
//                 console.log(responseData.base64str);
//                 this.setState({
//                     buyerImage: "data:image/png;base64," + responseData.base64str
//                 });
//             }).catch(function (err) {
//                 console.log(err)
//             });
//     }
// }














    render() {
        return (
            <div>
              <Sidebar/>
              <NavbarDash/>

              <center>
              <Card style={{ width: '50rem' }}>
                <center>
                <Form style={{ width: '45rem' }}>
                    
  <Form.Group controlId="exampleForm.ControlInput1">
  <br></br>

    <h3>Update Profile</h3>
    <br></br>
    <strong>Email address</strong>
    <Form.Control type="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
  
  
  <strong>About me</strong>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Update
  </Button>
  <br></br>
  <br></br>


</Form>
</center>
</Card>
</center>
            </div>
        )
    }
}
