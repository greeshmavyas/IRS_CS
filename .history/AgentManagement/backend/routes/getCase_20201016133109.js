const cases = require('../models/cases');
const express = require("../node_modules/express");
const router = express.Router();

router.get("/getCases", async function (req,res){
    console.log("In get cases");
    return await cases
      .find({})
      .then((result) => {
        console.log("cases retrieved");
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
        res.end("could not get cases");
      });
    
})

module.exports = router;