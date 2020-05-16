const PORT = 4000;

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const caseCreationRoute = express.Router();

let Case = require('../Models/CaseModel');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin295A@cluster0-fqeeb.mongodb.net/test?retryWrites=true&w=majority',
 { useNewUrlParser: true }, { useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Retreive all cases
caseCreationRoute.route('/').get(function(req, res) {
	console.log("End Point to fetch all the cases")
	Case.find(function(err, cases) {
        if (err) {
            console.log(err);
        } else {
            res.json(cases);
        }
    });
});

//Retreive cases of that user
caseCreationRoute.route('/:userID').get(function(req, res) {
	console.log("End Point to fetch all the cases created by that user")
	let userID = req.params.userID;
    Case.find({"UserID" : userID} , function(err, result) {
    	if (err) {
            console.log(err);
        } else{
        res.json(result);
    }
    });
});

// Retreive cases with resolution of that user
caseCreationRoute.route('/resolution/:userID').get(function(req, res) {
	console.log("End Point to fetch user cases with resolution")
	let userID = req.params.userID;
    Case.find({"UserID" : userID, "ResolutionComments" : {$ne : ""}} , function(err, result) {
    	if (err) {
            console.log(err);
        } else{
        res.json(result);
    }
    });
});

// Retreive a particular case of that user
caseCreationRoute.route('/eachCase/:userID').get(function(req, res) {
	console.log("End Point to fetch specific user case")
	let userID = req.params.userID;
	let caseID = req.body.caseID;
    Case.find({"UserID" : userID, "CaseID" : caseID }, function(err, result) {
    	if (err) {
            console.log(err);
        } else{
        res.json(result);
    }
    });
});

//Listing all the open cases of a user
caseCreationRoute.route('/activeCases/:userID').get(function(req, res) {
	console.log("End Point to fetch open user cases")
	let userID = req.params.userID;
    Case.find({"UserID" : userID, "Status" : {$nin : ["Closed"]}} , function(err, result) {
    	if (err) {
            console.log(err);
        } else{
        res.json(result);
    }
    });
});

//Updating an case status
caseCreationRoute.route('/status/:userID').post(function(req, res) {
	console.log("End Point to update the status of an issue");
	let userID = req.params.userID;
	let caseID = req.body.caseID;
	let caseStatus = req.body.Status;
	Case.findOne({"UserID" : userID, "CaseID" : caseID }, function(err, resCase) {
		if (err) {
            console.log(err);
        } else{
		console.log(resIssue);
		resCase.Status = caseStatus;
		resCase.save();
		res.json(resCase);
	}
    });
});

// creating a case
caseCreationRoute.route('/add').post(function(req, res) {
	console.log("End Point to create an Case")
	let newCase = new Case(req.body);
	newCase.save()
	.then(newCase => {
            res.status(200).json({'Case': 'Your case created successfully'});
        })
        .catch(err => {
            res.status(400).send('Can not create an Case');
        });
	
});


app.use('/case', caseCreationRoute);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});