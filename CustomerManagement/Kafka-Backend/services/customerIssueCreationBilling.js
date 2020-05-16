let Case = require("../models/CaseModel");

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

//Place order
function issuecreate(msg, callback) {
  Case.create(msg.newcase, function (err, newcase) {
    if (err) {
      console.log(err);
      console.log("unable to place order");
      callback(err, "Database Error");
    } else {
      console.log("Your case created successfully");
      callback(null, { status: 200, newcase });
    }
  });
}
