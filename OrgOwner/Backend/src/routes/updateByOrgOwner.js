var express = require("express");
var router = express.Router();
let Organization = require("../models/OrganizationModel");
var kafka = require("../routes/kafka/client");

// Add a new category to the organization
router.route("/org/category").put(function (req, res) {
  //From frontend, categories to be sent along with orgOwnerId as orgOwnerIDcategory Eg 7billing
  //which will be stored as it is in both kafka and DB

  //Create kafka topic corresponding to org category
  kafka.setTopics(req.body.Category);

  Organization.findOneAndUpdate(
    { _id: req.body.OrgID },
    { $addToSet: { Categories: req.body.Category } },
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

module.exports = router;
