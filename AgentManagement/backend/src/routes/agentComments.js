const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const genericApis = require("../genericApis")
var router = express.Router();
let Case = require("../models/CaseModel");

router.route('/agentAddMessage').post(function(req, res) {
    console.log("End Point to add message");
    let {message, caseId, userType, userId, userName, caseStatus} = req.body;

    if(!caseId || !message || !userType || !userId || !userName){
        res.status(200).json({ status: false, message: "message cannot be added!" });
    } else {
        //add message
        Case.findOne({"CaseID": caseId},  async (err, result)=>{
            if (err) {
                console.log("unable to insert into database", err);
                res.status(500).send('Can not add message');
            } else {
                if(result){
                   //TODO: send true status to client after adding value in history
                    let subject = "Case "+caseId+" has been updated";
                    let body = userName + " posted the following message: \n'" + message + "'";
                    genericApis.sendNotification(caseId, subject, body)
                    let resp = await genericApis.addHistory(userId, caseId, message +" (added by " + userName +")", "Comment")
                    if(resp){
                        res.status(200).json({ status: true, message: "message is added successfully!" });
                    } else {
                        res.status(200).json({ status: false, message: "message cannot be added!" });
                    }
                    
                } else {
                    console.log("case not found");
                    res.status(200).json({ status: false, message: "message cannot be added!" });
                }
            }
         })
        .catch(err => {
            res.status(400).send('Can not add message');
        });
    }

    
});

//update status in case
router.post('/updateStatus', function (req, res) {
    console.log("Inside agent updateStatus post request");
    console.log("Request query:");
    console.log(req.body);

    let { userID, caseID, status } = req.body;
    console.log(caseID)

    Case.findOneAndUpdate({"CaseID": caseID } ,
        { $set: { "Status":status} },  async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ responseMessage: 'update failed' });
            } else {
                console.log(" got user ");
                console.log(result)
                let resp = await genericApis.addHistory(userID, caseID, status, "Status")
                if(resp){
                    res.status(200).json({
                        responseMessage: 'status updated Successfully'
                    });
                } else {
                    res.status(400).json({
                        responseMessage: 'cannot updated status',
                    });
                }
            }
        }).catch((err)=>{
            res.status(400).json({
                responseMessage: 'cannot updated status'
            });
        })
        
})

module.exports = router;