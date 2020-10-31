const express = require('express');

var app = express();
app.set('view engine', 'ejs');

var agentDetails = require('./../models/agentDetails');
var cases = require('../models/cases')

router = express.Router();
var exports = module.exports = {};

//Agent login route
router.post('/agentLogin', function (req, res) {
    console.log("Inside agent login post request");
    console.log("Request query:");
    console.log(req.query);

    let {emailId, password} = req.query;
    console.log("emailId" + emailId)


    agentDetails.findOne({ emailId }).then(user => {
        console.log(user)
        if (!user) {
            res.status(404).json({ responseMessage: 'User not found' });
        } else {
            console.log("user:", user)
            if (user.password === password) {
                console.log("Status is 200");
                res.status(200).json({ responseMessage: 'Login Successfully',
                info :{
                    firstname : user.firstName,
                    organisationID: user.organisationID,
                    agentID : user.agentID  
                  } });
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

    let {emailId, password} = req.query;
    console.log("emailId" + emailId)


    agentDetails.findOne({ emailId }).then(user => {
        console.log(user)
        if (!user) {
            res.status(404).json({ responseMessage: 'User not found' });
        } else {
            console.log("user :", user)
            if (user.password === password) {
                console.log("Status is 200");
                res.status(200).json({ responseMessage: 'Login Successfully', 
                                        });
            } else {
                res.status(500).json({ responseMessage: 'Invalid password' });
            }
        }
    });

})

router.get("/getCases", async function (req,res){
    console.log("In get cases");
    console.log("Request query:");
    console.log(req.query);

    return await cases
      .find({})
      .then((result) => {
        console.log("cases retrieved");
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
        res.end("could not get cases");
      });
    
})

module.exports = router;