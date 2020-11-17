var express = require("express");
var router = express.Router();
let Organization = require("../models/OrganizationModel");
let Agent = require("../models/AgentModel");
var kafka = require("../routes/kafka/client");

// Add a new category to the organization
router.route("/org/category").put(function (req, res) {
  //From frontend, categories to be sent along with orgOwnerId as orgOwnerIDcategory Eg 7billing
  //which will be stored as it is in both kafka and DB

  //Create kafka topic corresponding to org category
  kafka.setTopics(req.body.Category);

  Organization.findOneAndUpdate(
    { _id: req.body.OrgID },
    { $addToSet: { Categories: req.body.Category }},
    { new: true },
    function (err, org) {
      if (err) {
        console.log(err);
        console.log("unable to update database");
        res.status(400).json({ responseMessage: "unable to update database" });
      } else {
        console.log("result:", org);
        console.log("org category save successful");
        res
          .status(200)
          .json({ responseMessage: "org category save successful", org });
      }
    }
  );
});

//Update agent categories[only add new categories], email, first name, last name
//categories to be sent as combination of orgid and category
router.route("/org/agent").put(function (req, res) {
  //Create kafka topic corresponding to org category
  kafka.setTopics(req.body.Categories);

  Agent.findOneAndUpdate(
    { Username: req.body.Username },
    { $addToSet: { Categories: req.body.Categories },  $set:{ FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email}},
    { new: true },
    function (err, agent) {
      if (err) {
        console.log(err);
        console.log("unable to update database");
        res.status(400).json({ responseMessage: "unable to update database" });
      } else {
        for (i = 0; i < req.body.Categories.length; i++) {
          if (global.topics_to_agents.has(req.body.Categories[i])) {
            global.topics_to_agents
              .get(req.body.Categories[i])
              .push(agent._id);
          } else {
            global.topics_to_agents.set(req.body.Categories[i], [
              agent._id,
            ]);
          }
        }
        console.log("result:", agent);
        console.log("Agent update successful");
        console.log("topics" + JSON.stringify(global.topics_to_agents));
        res
          .status(200)
          .json({ responseMessage: "Agent update successful", agent });
      }
    }
  );
});


module.exports = router;
