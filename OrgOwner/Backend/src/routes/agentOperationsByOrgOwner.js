var express = require("express");
var router = express.Router();
var Agent = require("../models/AgentModel");
var HashMap = require("hashmap");
//update when agent added
global.topics_to_agents = new HashMap();
//update when case created and case status updated
global.agents_to_count = new HashMap();

//Add agent and update maps
router.route("/addAgent").post(function (req, res) {
  Agent.findOne({ Username: req.body.Username }, function (err, agent) {
    if (err) {
      console.log(err);
      console.log("unable to read the database");
      res.status(400).json({
        responseMessage: "unable to read the organization owner database",
      });
    } else {
      if (agent) {
        console.log("OrgOwner already exists");
        res
          .status(401)
          .json({ responseMessage: "Agent/Username already exists" });
      } else {
        //Add Agent
        var agent = {
          OrgId: req.body.OrgOwnerId,
          Categories: req.body.Categories,
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Email: req.body.Email,
          Username: req.body.Username,
        };
        Agent.create(agent, function (err, agent) {
          if (err) {
            console.log(err);
            console.log("Unable to create agent");
            res.status(400).json({
              responseMessage: "Unable to create agent",
            });
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
            global.agents_to_count.set(agent._id, 0);
            console.log("Your agent is created successfully");
            console.log("topics" + JSON.stringify(global.topics_to_agents));
            res.status(200).json({
              responseMessage: "Your agent is created successfully",
              agent,
            });
          }
        });
      }
    }
  });
});
// Retreive all agents
router.route("/agents").get(function (req, res) {
  console.log("End Point to fetch all the cases");
  Agent.find(function (err, agents) {
    if (err) {
      console.log(err);
      res
        .status(400)
        .json({ responseMessage: "Couldn't retrive the agents", err });
    } else {
      res.status(200).json({
        responseMessage: "All agents",
        agents,
      });
    }
  });
});

module.exports = router;
