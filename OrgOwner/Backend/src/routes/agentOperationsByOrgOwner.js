var express = require("express");
var router = express.Router();
var Agent = require("../models/AgentModel");
var Case = require("../models/CaseModel");
var HashMap = require("hashmap");
var crypt = require("../models/bcrypt.js");
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
        crypt.createHash(req.body.TempPassword, function (response) {
          encryptedPassword = response;
          var agent = {
            OrgID: req.body.OrgId,
            Categories: req.body.Categories,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Username: req.body.Username,
            PhoneNumber: req.body.PhoneNumber,
            Password: encryptedPassword,
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
        });
      }
    }
  });
});
// Retreive all agents by orgID
router.route("/agents/:OrgID").get(function (req, res) {
  console.log("End Point to fetch all the cases");
  Agent.find({ OrgID: req.params.OrgID }, function (err, agents) {
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

// on start of app: from DB, populate topics to agents and agents to case count maps
router.route("/populateMaps").get(function (req, res) {
  console.log("End Point to populate TopicsToAgentsMap");
  Agent.find(function (err, agents) {
    if (err) {
      console.log(err);
      res
        .status(400)
        .json({ responseMessage: "Couldn't retrive the agents", err });
    } else {
      for (j = 0; j < agents.length; j++) {
        for (i = 0; i < agents[j].Categories.length; i++) {
          if (global.topics_to_agents.has(agents[j].Categories[i])) {
            global.topics_to_agents
              .get(agents[j].Categories[i])
              .push(agents[j]._id);
          } else {
            global.topics_to_agents.set(agents[j].Categories[i], [
              agents[j]._id,
            ]);
          }
        }
      }
      console.log("topics" + JSON.stringify(global.topics_to_agents));

      console.log("End Point to populate AgentsToCount map");
      Case.find(function (err, cases) {
        if (err) {
          console.log(err);
          res
            .status(400)
            .json({ responseMessage: "Couldn't retrive the cases", err });
        } else {
          for (j = 0; j < cases.length; j++) {
            console.log("case status" + cases[j].AgentID);
            if (
              cases[j].Status == "Assigned" ||
              cases[j].Status == "InProgress"
            ) {
              if (global.agents_to_count.has(cases[j].AgentID)) {
                global.agents_to_count.set(
                  cases[j].AgentID,
                  global.agents_to_count.get(cases[j].AgentID) + 1
                );
              } else {
                global.agents_to_count.set(cases[j].AgentID, 1);
              }
            }
          }
          console.log(
            "agents to counts" + JSON.stringify(global.agents_to_count)
          );
        }
      });

      res.status(200).json({
        responseMessage: "topics_to_agents, agents_to_count maps are populated",
      });
    }
  });
});

module.exports = router;
