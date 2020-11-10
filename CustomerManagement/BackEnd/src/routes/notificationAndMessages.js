
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const genericApis = require("../genericApis")
var router = express.Router();
let Case = require("../models/CaseModel");

router.route('/addMessage').post(function(req, res) {
    console.log("End Point to add message");
    let {message, caseId, userType, userId, userName} = req.body;
    
    //console.log(caseId);
    //console.log(message);
    //console.log(userId+".."+userType);
    if(!caseId || !message || !userType || !userId || !userName){
        res.status(200).json({ status: false, message: "message cannot be added!" });
    } else {
        //add message
        Case.updateOne({"CaseID": caseId}, {$push:{'Messages': { UserType: userType, Message: message, UserID: userId,TimeStamp:genericApis.getTodayDate(), UserName: userName } } }, (err, result)=>{
            if (err) {
                console.log("unable to insert into database", err);
                res.status(500).send('Can not add message');
            } else {
                if(result){
                   //TODO: send true status to client after adding value in history
                    genericApis.addHistory(userId, caseId, message +" (added by " + userType +")")

                    let subject = "Case "+caseId+" has been updated";
                    let body = "The " + userType + ":" + userId + " posted the following message: \n'" + message + "'";
                    genericApis.sendNotification(caseId, subject, body)

                    res.status(200).json({ status: true, message: "message is added successfully!" });
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


router.route('/subscribe').post(function(req, res) {
    console.log("End Point to subscribe");
    let emailId = req.body.emailId;
    let caseId = req.body.caseId;
    console.log(caseId);
    console.log(emailId);
    if(!caseId || !emailId)
        res.json({"status":false, "message":"cannot subscribe"});
    Case.updateOne({"CaseID" : caseId }, {$addToSet:{"Subscribers":emailId}}, function(err, resCase) {
        if (err) {
            console.log(err);
            res.json({"status":false, "message":"cannot subscribe to the case"});
        } else if(resCase){
            console.log(resCase);
            res.json({"status":true, "message":"successfully subscribed"});
        } else {
            res.json({"status":false, "message":"cannot subscribe to the case"});
        }
    });
});


router.route('/unsubscribe').post(function(req, res) {
    console.log("End Point to unsubscribe");
    let emailId = req.body.emailId;
    let caseId = req.body.caseId;
    console.log(caseId);
    console.log(emailId);
    if(!caseId || !emailId)
        res.json({"status":false, "message":"cannot unsubscribe"});
    else {
        Case.updateOne({"CaseID" : caseId }, {$pull:{"Subscribers":emailId}}, function(err, resCase) {
            if (err) {
                console.log(err);
                res.json({"status":false, "message":"cannot unsubscribe"});
            } else if(resCase){
                console.log(resCase);
                res.json({"status":true, "message":"successfully unsubscribed"});
            } else {
                res.json({"status":false, "message":"cannot unsubscribe"});
            }
        });
    }
   
});

module.exports = router;