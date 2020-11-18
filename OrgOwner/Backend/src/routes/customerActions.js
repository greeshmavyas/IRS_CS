var express = require("express");
var router = express.Router();
let Case = require("../models/CaseModel");
var kafka = require("./kafka/client");

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

//creating a case - kafka API
router.route("/add").post(function (req, res) {
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
        res.end(JSON.stringify(result.newcase));
      }
    }
  );
});

//Retrieve cases by category for dashboard
router.route("/casesByCategory/:Category").get(function (req, res) {
  console.log("In retrieve cases by category");
  let category = req.params.Category;
  Case.find({ Category: category }, function (err, cases) {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Unable to find case info" });
    } else {
      console.log(cases);
      res.status(200).json({
        responseMessage: "All cases by given category",
        category,
        cases,
      });
    }
  });
});

//Retrieve cases by status for dashboard
router.route("/casesByStatus/:Status").get(function (req, res) {
  console.log("In retrieve cases by status");
  let status = req.params.Status;
  let orgID = req.params.Case.find({ Status: status, OrgID: orgID }, function (
    err,
    cases
  ) {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Unable to find case info" });
    } else {
      console.log(cases);
      res.status(200).json({
        responseMessage: "All cases by given status",
        status,
        cases,
      });
    }
  });
});

//Retrieve cases by orgID for dashboard
router.route("/casesForDashboardByOrgID/:OrgID").get(function (req, res) {
  console.log("In retrieve cases by orgID");

  let orgID = req.params.OrgID;
  Case.find({ organisationID: orgID }, function (err, cases) {
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
module.exports = router;
