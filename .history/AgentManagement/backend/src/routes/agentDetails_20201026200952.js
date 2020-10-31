const express = require('express');

var app = express();
app.set('view engine', 'ejs');

var agentDetails = require('./../models/agentDetails');

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
                res.status(200).json({ responseMessage: 'Login Successfully' });
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
            console.log("user:", user)
            if (user.password === password) {
                console.log("Status is 200");
                res.status(200).json({ responseMessage: 'Login Successfully' });
            } else {
                res.status(500).json({ responseMessage: 'Invalid password' });
            }
        }
    });

})
module.exports = router;