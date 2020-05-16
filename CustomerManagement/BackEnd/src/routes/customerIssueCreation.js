var express = require("express");
var router = express.Router();
let Case = require("../models/CaseModel");

// Retreive all cases
router.route("/").get(function (req, res) {
  console.log("End Point to fetch all the cases");
  Case.find(function (err, cases) {
    if (err) {
      console.log(err);
    } else {
      res.json(cases);
    }
  });
});

//Retreive cases of that user
router.route("/:userID").get(function (req, res) {
  console.log("End Point to fetch all the cases created by that user");
  let userID = req.params.userID;
  Case.find({ UserID: userID }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// Retreive cases with resolution of that user
router.route("/resolution/:userID").get(function (req, res) {
  console.log("End Point to fetch user cases with resolution");
  let userID = req.params.userID;
  Case.find({ UserID: userID, ResolutionComments: { $ne: "" } }, function (
    err,
    result
  ) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// Retreive a particular case of that user
router.route("/eachCase/:userID").get(function (req, res) {
  console.log("End Point to fetch specific user case");
  let userID = req.params.userID;
  let caseID = req.body.caseID;
  Case.find({ UserID: userID, CaseID: caseID }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//Listing all the open cases of a user
router.route("/activeCases/:userID").get(function (req, res) {
  console.log("End Point to fetch open user cases");
  let userID = req.params.userID;
  Case.find({ UserID: userID, Status: { $nin: ["Closed"] } }, function (
    err,
    result
  ) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//Updating an case status
router.route("/status/:userID").post(function (req, res) {
  console.log("End Point to update the status of an issue");
  let userID = req.params.userID;
  let caseID = req.body.caseID;
  let caseStatus = req.body.Status;
  Case.findOne({ UserID: userID, CaseID: caseID }, function (err, resCase) {
    if (err) {
      console.log(err);
    } else {
      console.log(resIssue);
      resCase.Status = caseStatus;
      resCase.save();
      res.json(resCase);
    }
  });
});

// creating a case
router.route("/add").post(function (req, res) {
  console.log("End Point to create a Case");
  console.log(req.body);
  let newCase = new Case(req.body);
  console.log("HIIII");
  newCase
    .save()
    .then((newCase) => {
      res.status(200).json({ Case: "Your case created successfully" });
    })
    .catch((err) => {
      res.status(400).send("Can not create Case");
    });
});

module.exports = router;
