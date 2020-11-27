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

  Case.create(newCase, function (err, cusCase) {
    if (err) {
      console.log(err);
      console.log("Unable to create case");
      callback(err, "Unable to create the case");
    } else {
      CaseHistory.create(history, function (err, history) {
        if (err) {
          console.log(err);
          console.log("Unable to create case history");
          callback(err, "Unable to create the case history");
        } else {
          callback(null, { status: 200, cusCase });
        }
      });
    }
  });
  // newCase
  //   .save()
  //   .then((newCase) => {
  //     history
  //       .save()
  //       .then((history) => {
  //         callback(null, { status: 200, newcase });
  //       })
  //       .catch((err) => {
  //         callback(err, "Unable to create the case");
  //       });
  //   })
  //   .catch((err) => {
  //     callback(err, "Unable to create the case");
  //   });
}
