var express = require("express");
var router = express.Router();
let CustomerDetail = require("../models/CustomerDetail");
var kafka = require("../routes/kafka/client");

router.route("/details/:custID").get(function (req, res) {
  console.log("End Point to fetch all the cases");
  let custID = req.params.custID;
  /*CustomerDetail.find(function (err, details) {
    if (err) {
      console.log(err);
    } else {
      res.json(details);
    }
  });*/
  CustomerDetail.find({ CustomerID: custID }, function (err, resDetails) {
    if (err || !resDetails) {
      console.log(err);
    } else {
      res.json(resDetails);
    }
  });
});
module.exports = router;
