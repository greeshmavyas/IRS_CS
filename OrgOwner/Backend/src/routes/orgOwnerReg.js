//Libraries
var express = require("express");
var crypt = require("../models/bcrypt.js");
var router = express.Router();
var kafka = require("../routes/kafka/client");
var config = require("../../config/settings");
var OrgOwner = require("../models/OrgOwnerModel");
// Set up middleware
var jwt = require("jsonwebtoken");

// Validate orgOwner login details and get a JSON Web Token to include in the header of future requests.
// if orgOwnerID is required, use the other api to get orgownerid by username
router.route("/orgOwner/login").post(function (req, res) {
  console.log("Inside orgOwner Login Post");
  var username = req.body.Username;
  var lowercaseUsername = username.toLowerCase();
  var trimUsername = lowercaseUsername.trim();

  OrgOwner.findOne({ Username: trimUsername }, function (err, orgOwner) {
    if (err) {
      console.log(err);
      console.log("unable to read the database");
      res.status(400).json({
        responseMessage: "unable to read the organization owner database",
      });
    } else if (orgOwner) {
      console.log("org owner:", orgOwner);
      crypt.compareHash(req.body.Password, orgOwner.Password, function (
        err,
        isMatch
      ) {
        if (isMatch && !err) {
          console.log("OrgOwner Login Successful");
          console.log("result:", orgOwner);
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(
            { id: orgOwner._id, username: orgOwner.Username },
            config.secret_key,
            {
              expiresIn: 7200, // expires in 2 hours
            }
          );
          req.session.orgOwner = orgOwner.UserName;
          //It’s important the Auth header starts with JWT and a whitespace followed by the token, else passport-jwt will not extract it.
          res.status(200).json({
            responseMessage: "Login Successful",
            token: "JWT " + token,
            cookie1: "orgOwnercookie",
            cookie2: trimUsername,
            cookie3: orgOwner.FirstName,
            cookie4: orgOwner.LastName,
          });
          console.log("OrgOwner found in DB");
        } else {
          res.status(401).json({
            responseMessage: "Authentication failed. Password did not match.",
          });
        }
      });
    } else {
      res.status(402).json({
        responseMessage: "Authentication failed. Customer does not exist.",
      });
      console.log("Authentication failed. Customer does not exist.");
    }
  });
});

// Add orgOwner and get a JSON Web Token to include in the header of future requests.
router.route("/orgOwner/signUp").post(function (req, res) {
  console.log("In orgOwner Signup Post");
  console.log(req.body);
  var username = req.body.Username.toLowerCase();
  var trimUsername = username.trim();

  OrgOwner.findOne({ Username: trimUsername }, function (err, rows) {
    if (err) {
      console.log(err);
      console.log("unable to read the database");
      res.status(400).json({ responseMessage: "Database Error" });
    } else {
      if (rows) {
        console.log("OrgOwner already exists");
        res.status(401).json({ responseMessage: "OrgOwner already exists" });
      } else {
        crypt.createHash(req.body.Password, function (response) {
          encryptedPassword = response;
          var orgOwnerData = {
            FirstName: req.body.FirstName,
            LastName: req.body.Lastname,
            Username: trimUsername,
            Email: req.body.Email,
            Password: encryptedPassword,
            ZipCode: req.body.ZipCode,
          };

          //Save the user in database
          OrgOwner.create(orgOwnerData, function (err, orgOwner) {
            if (err) {
              console.log("unable to insert into database", err);
              res.status(400).json({ responseMessage: "Database Error" });
            } else {
              console.log("OrgOwner Signup Successful");
              var token = jwt.sign(
                { id: orgOwner._id, username: orgOwner.Username },
                config.secret_key,
                {
                  expiresIn: 7200, // expires in 2 hours
                }
              );
              res.status(200).json({
                responseMessage: "OrgOwner Added",
                token: "JWT " + token,
                cookie1: "orgOwnerCookie",
                cookie2: trimUsername,
                cookie3: req.body.FirstName,
                cookie4: req.body.LastName,
              });
            }
          });
        });
      }
    }
  });
});

// save customer profile details
router.route("/orgOwner/profileSave").post(function (req, res) {
  console.log("In customer profile save Post");
  username = req.body.Username.toLowerCase();
  trimusername = username.trim();

  var orgOwnerData = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    ZipCode: req.body.ZipCode,
    Email: req.body.Email,
  };
  console.log(orgOwnerData);
  OrgOwner.findOneAndUpdate(
    { Username: req.body.Username },
    orgOwnerData,
    { returnNewDocument: true },
    function (err, orgOwner) {
      if (err) {
        console.log(err);
        console.log("unable to update database");
        res.status(400).json({ responseMessage: "unable to update database" });
      } else {
        console.log("result:", orgOwner);
        console.log("OrgOwner Profile save Successful");
        res
          .status(200)
          .json({ responseMessage: "OrgOwner Profile save Successful" });
      }
    }
  );
});

//Fetch org owner details
router.route("/orgOwner/profile/:Username").get(function (req, res) {
  console.log("Inside org owner profile fetch");
  OrgOwner.findOne({ Username: req.params.Username }, function (err, orgOwner) {
    if (err) {
      console.log(err);
      console.log("OrgOwner not found");
      res.status(400).json({ responseMessage: "Org owner not found" });
    } else {
      console.log("Org Owner profile fetch successful");
      console.log("Profile Details:", orgOwner);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(orgOwner));
    }
  });
});
module.exports = router;
