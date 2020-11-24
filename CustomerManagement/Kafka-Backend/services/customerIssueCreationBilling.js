let Case = require("../models/CaseModel");
let CaseHistory = require("../models/CaseHistory");

exports.customerIssueCreationBillingService = function customerIssueCreationBillingService(
  msg,
  callback
) {
  console.log("In customerIssueCreationTopic path:", msg.path);
  switch (msg.path) {
    case "issuecreate":
      issuecreate(msg, callback);
      break;
  }
};

//Create the case
function issuecreate(msg, callback) {
  console.log("End Point to create a Case");
  console.log(req.body);
  let newCase = new Case(msg.newCase);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  newCase.CreatedOn = dateTime;
  let history = new CaseHistory(msg.newCase);
  history.CreatedOn = dateTime;
  history.UpdatedOn = dateTime;
  newCase
    .save()
    .then((newCase) => {
      history
        .save()
        .then((history) => {
          callback(null, { status: 200, newcase });
        })
        .catch((err) => {
          callback(err, "Unable to create the case");
        });
    })
    .catch((err) => {
      callback(err, "Unable to create the case");
    });
}
