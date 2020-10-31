const express = require('express');

var app = express();
app.set('view engine', 'ejs');

var agentDetails = require('./../models/agentDetails');
var cases = require('../models/cases');

router = express.Router();
var exports = module.exports = {};

//Agent login route
router.post('/agentLogin', function (req, res) {
    console.log("Inside agent login post request");
    console.log("Request query:");
    console.log(req.query);

    let { emailId, password } = req.query;
    console.log("emailId" + emailId)


    agentDetails.findOne({ emailId }).then(user => {
        console.log(user)
        if (!user) {
            res.status(404).json({ responseMessage: 'User not found' });
        } else {
            console.log("user:", user)
            if (user.password === password) {
                console.log("Status is 200");
                res.status(200).json({
                    responseMessage: 'Login Successfully',
                    info: {
                        firstname: user.firstName,
                        organisationID: user.organisationID,
                        agentID: user.agentID
                    }
                });
            } else {
                res.status(500).json({ responseMessage: 'Invalid password' });
            }
        }
    });

})

//Agent update profile route
router.post('/updateProfile', function (req, res) {
    console.log("Inside agent updateProfile post request");
    console.log("Request query:");
    console.log(req.query);

    let { emailId, password } = req.query;
    console.log("emailId" + emailId)


    agentDetails.findOne({ emailId }).then(user => {
        console.log(user)
        if (!user) {
            res.status(404).json({ responseMessage: 'User not found' });
        } else {
            console.log("user :", user)
            if (user.password === password) {
                console.log("Status is 200");
                res.status(200).json({
                    responseMessage: 'Login Successfully',
                });
            } else {
                res.status(500).json({ responseMessage: 'Invalid password' });
            }
        }
    });

})

router.get("/getCases", async function (req, res) {
    console.log("In get cases");
    console.log("Request query:");
    console.log(req.query);

    let { agentID, organisationID } = req.query;
    console.log("emailId" + agentID)


    cases.find({ "agentID": parseInt(agentID) , "organisationID": parseInt(organisationID) }).then(cases => {
        console.log(cases)
        if (!cases) {
            res.status(500).json({ responseMessage: 'Cases not found' });
        } else {
            console.log("Cases :", cases)
            res.status(200).json({
                responseMessage: 'Login Successfully',
                cases: cases
            });
        }
    })
})
    module.exports = router;