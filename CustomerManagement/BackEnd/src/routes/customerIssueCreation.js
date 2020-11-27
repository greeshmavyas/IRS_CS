var express = require("express");
var router = express.Router();
let Case = require("../models/CaseModel");
let CaseHistory = require("../models/CaseHistory");
var kafka = require("../routes/kafka/client");
var config = require("../../config/settings");
var request = require("request");
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
  let organisationId = req.query.organisationId;
  //console.log(customerId, " ", organisationId);
  Case.find({ UserID: customerId, OrganisationID: organisationId }, function (
    err,
    result
  ) {
    if (err || !result) {
      console.log(err);
      res.json({ status: false, cases: "", message: "cannot retrieve cases" });
    } else {
      // console.log(result);
      res.json({ status: true, cases: result });
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
  /*CaseHistory.find({ UserID: userID, CaseID: caseID })
    .sort({ UpdatedOn: -1 })
    .exec(function (err, resCase) {
      if (err) {
        console.log(err);
      } else {
        res.json(resCase);
      }
    });*/
  CaseHistory.find({ UserID: userID, CaseID: caseID }, function (err, resCase) {
    if (err || !resCase) {
      console.log(err);
    } else {
      res.json(resCase);
    }
  });
});

//creating a case - kafka API
router.route("/add").post(function (req, res) {
  console.log(req.body.Category);
  var agents = global.topics_to_agents.get(req.body.Category);
  console.log("agents" + agents);
  var min_count = global.agents_to_count.get(agents[0]);
  var agent = agents[0];
  console.log("agent1" + agent);
  if (agents.length > 1) {
    for (i = 1; i < agents.length; i++) {
      if (min_count > global.agents_to_count.get(agents[i])) {
        agent = agents[i];
      }
    }
  }
  global.agents_to_count.set(agent, global.agents_to_count.get(agent) + 1);

  console.log("agent" + agent);
  console.log("map" + JSON.stringify(global.agents_to_count));
  var newCase = {
    UserID: req.body.UserID,
    Category: req.body.Category,
    Information: req.body.Information,
    Status: "Assigned",
    AgentID: agent,
    OrgID: req.body.OrgID
  };

  kafka.make_request(
    req.body.Category,
    { path: "issuecreate", newCase: newCase },
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({ responseMessage: "Unable to case info" });
      } else {
        res.writeHead(200, {
          "content-type": "application/json",
        });
        res.end(JSON.stringify(result.cusCase));
      }
    }
  );
});

//Retrieve cases by orgID for dashboard
router.route("/casesForDashboardByOrgID/:OrgID").get(function (req, res) {
  console.log("In retrieve cases by orgID");

  let orgID = req.params.OrgID;
  Case.find({ OrgID: orgID }, function (err, cases) {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Unable to find case info" });
    } else {
      console.log(cases);
      res.status(200).json({
        responseMessage: "All cases by given status",
        cases,
      });
    }
  });
});

router.route("/caseCategory").get(function (req, res) {
  console.log("End Point to hit NLP model to get case category");
  console.log(req.query);

  var clientServerOptions = {
    uri: config.awsEndpoint,
    body: JSON.stringify(req.query),
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  request(clientServerOptions, function (error, response) {
    if (error) {
      res.json({ error: error });
    } else {
      res.json({ category: response.body });
    }
  });
});

module.exports = router;
