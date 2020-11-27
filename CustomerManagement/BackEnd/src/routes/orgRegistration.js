var express = require("express");
var router = express.Router();
let Organization = require("../models/OrganizationModel");
var kafka = require("../routes/kafka/client");
var OrgOwner = require("../models/OrgOwnerModel");
const jwt_decode = require("jwt-decode");

//Register the organization
router.route("/registerOrg").post(function (req, res) {
  //From frontend, categories to be sent along with orgOwnerId as orgOwnerIDcategory Eg 7billing
  //which will be stored as it is in both kafka and DB

  //get orgOwnerId from jwt token
  const token = req.body.token;
  let jwt_decoded = jwt_decode(token);

  var org = {
    OrgOwnerId: jwt_decoded.id,
    OrgName: req.body.OrgName,
    Domain: req.body.Domain,
  };

  //Register the organization
  Organization.create(org, function (err, org) {
    if (err) {
      console.log(err);
      console.log("Unable to register the organization");
      res.status(400).json({
        responseMessage: "Unable to register the organization",
      });
    } else {
      let categories = req.body.Categories;
      for (i = 0; i < categories.length; i++) {
        categories[i]= org._id+'_'+categories[i];        
      }
      //Create kafka topics corresponding to org categories
      kafka.setTopics(categories);
      Organization.findOneAndUpdate(
        { _id: org._id },
        {Categories : categories},
        { new: true },
        function (err, org) {
          if (err) {
            console.log(err);
            console.log("unable to update categories in database");
            res
              .status(400)
              .json({ responseMessage: "unable to update categories in database" });
          } else {
            console.log("Organization registered successfully");
            console.log("Your organization is registered successfully");
             res.status(200).json({
               responseMessage: "Your organization is registered successfully",
               org,
            });
          }
        }
      );
    }
  });
});

//Fetch org owner details
router.route("/org/:Username").get(function (req, res) {
  console.log("Inside org owner profile fetch");
  OrgOwner.findOne({ Username: req.params.Username }, function (err, orgOwner) {
    if (err) {
      console.log(err);
      console.log("OrgOwner not found");
      res.status(400).json({ responseMessage: "Org owner not found" });
    } else {
      console.log("Org Owner fetched to get org");
      console.log("Profile Details:", orgOwner);

      Organization.findOne({ OrgOwnerId: orgOwner._id }, function (
        err,
        organization
      ) {
        if (err) {
          console.log(err);
          console.log("organization not found");
          res.status(400).json({ responseMessage: "Organization not found" });
        } else {
          console.log("Organization fetched");
          console.log("Organization Details:", organization);

          res.writeHead(200, { "content-type": "application/json" });
          res.end(JSON.stringify(organization));
        }
      });
    }
  });
});

module.exports = router;
