const express = require('express');

var app = express();
app.set('view engine', 'ejs');

var agentDetails = require('./../models/agentDetails');
var cases = require('../models/cases');

router = express.Router();
var exports = module.exports = {};

let CaseHistory = require("./../models/CaseHistory");


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
                        agentID: user.agentID,
                        emailId: user.emailId
                    }
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

    cases.find({ $and: [{ "AgentID": agentID }, { "organisationID": organisationID }] }).then(cases => {
        console.log(cases)
        if (!cases) {
            res.status(500).json({ responseMessage: 'Cases not found' });
        } else {
            console.log("Cases :", cases)
            res.status(200).json({
                responseMessage: 'Cases Retrived',
                cases: cases
            });
        }
    })
})
//get agent details
router.get("/getProfile", async function (req, res) {
    console.log("In get profile");
    console.log("Request query:");
    console.log(req.query);

    let { agentID, organisationID } = req.query;

    agentDetails.find({ $and: [{ "agentID": agentID }, { "organisationID": organisationID }] }).then(agent => {
        console.log(agent)
        if (!agent) {
            res.status(500).json({ responseMessage: 'Cases not found' });
        } else {
            console.log("agent details :", agent[0])
            res.status(200).json({
                responseMessage: 'agent setails Retrived',
                agent: agent[0]
            });
        }
    })
})

//Agent update profile route
router.post('/updateProfile', function (req, res) {
    console.log("Inside agent updateProfile post request");
    console.log("Request query:");
    console.log(req.query);

    let { phoneNumber, password, agentID, organisationID } = req.query;
   
    console.log(phoneNumber)
    console.log(password)

    agentDetails.findOneAndUpdate({ $and: [{ "agentID": agentID }, { "organisationID": organisationID }] } ,
        { $set: { "phoneNumber":phoneNumber, "password":password } },  (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ responseMessage: 'update failed' });
            } else {
                console.log(" got user ");
                console.log(result)
                res.status(200).json({
                    responseMessage: 'updated Successfully',
                });
            }
        })
})

router.route("/history/:userID/:caseID").get(function (req, res) {
    console.log("End Point to retreive the history of a case");
    let userID = req.params.userID;
    let caseID = req.params.caseID;

      CaseHistory.find({ UserID: userID, CaseID: caseID }, function (err, resCase) {
        if (err ||!resCase) {
          console.log(err);
        } else {
          res.json(resCase);
        }
      });
      
  });

module.exports = router;