var express = require("express");
var router = express.Router();
let Case = require("../models/CaseModel");
let CaseHistory = require("../models/CaseHistory");
var kafka = require("../routes/kafka/client");
//let case

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
router.route("/customerDashboard").get(function (req, res) {
  console.log("End Point to fetch all the cases created by that user");
  let customerId = req.query.customerId;
  let organisationId = req.query.organisationId
  Case.find({ UserID: customerId, organisationID: organisationId }, function (err, result) {
    if (err || !result) {
      console.log(err);
      res.json({"status":false,"cases":"","message":"cannot retrieve cases"})
    } else {
     // console.log(result);
      res.json({"status":true, "cases":result});
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
  let caseID = req.body.CaseID;
  let caseStatus = req.body.Status;
  Case.findOne({ UserID: userID, CaseID: caseID }, function (err, resCase) {
    if (err) {
      console.log(err);
    } else {
      //console.log(resIssue);
      resCase.Status = caseStatus;
      resCase.save();
      let history = new CaseHistory();
      history.UserID = userID;
      history.CaseID = caseID;
      history.Status = caseStatus;
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;
      history.UpdatedOn = dateTime;
      history
        .save()
        .then((history) => {
          res
            .status(200)
            .json({ Case: "Your case updated in history successfully" });
        })
        .catch((err) => {
          res.status(400).send("Can not create Case");
        });

      //res.json(resCase);
    }
  });
});

//Updating case Resolution comments
router.route("/resolutionComments/:userID").post(function (req, res) {
  console.log("End Point to update the status of an issue");
  let userID = req.params.userID;
  let caseID = req.body.CaseID;
  let resolutionComments = req.body.ResolutionComments;
  Case.findOne({ UserID: userID, CaseID: caseID }, function (err, resCase) {
    if (err) {
      console.log(err);
    } else {
      //console.log(resIssue);
      resCase.ResolutionComments = resolutionComments;
      resCase.save();
      let history = new CaseHistory();
      history.UserID = userID;
      history.CaseID = caseID;
      history.ResolutionComments = resolutionComments;
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;
      history.UpdatedOn = dateTime;
      history
        .save()
        .then((history) => {
          res
            .status(200)
            .json({ Case: "Your case updated in history successfully" });
        })
        .catch((err) => {
          res.status(400).send("Can not create Case");
        });

      //res.json(resCase);
    }
  });
});

//Retreiving history of  case
router.route("/history/:userID/:caseID").get(function (req, res) {
  console.log("End Point to retreive the history of a case");
  let userID = req.params.userID;
  let caseID = req.params.caseID;
  CaseHistory.find({ UserID: userID, CaseID: caseID })
    .sort({ UpdatedOn: -1 })
    .exec(function (err, resCase) {
      if (err) {
        console.log(err);
      } else {
        res.json(resCase);
      }
    });
});

// creating a case
router.route("/add").post(function (req, res) {
  console.log("End Point to create a Case");
  console.log(req.body);
  let newCase = new Case(req.body);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  newCase.CreatedOn = dateTime;
  let history = new CaseHistory(req.body);
  history.CreatedOn = dateTime;
  history.UpdatedOn = dateTime;
  //historyUpdate(req.body);
  console.log("HIIII");

  newCase
    .save()
    .then((newCase) => {
      history
        .save()
        .then((history) => {
          res
            .status(200)
            .json({ Case: "Your case updated in history successfully" });
        })
        .catch((err) => {
          res.status(400).send("Can not create Case");
        });
      //res.status(200).json({ Case: "Your case created successfully" });
    })
    .catch((err) => {
      res.status(400).send("Can not create Case");
    });
});

module.exports = router;
