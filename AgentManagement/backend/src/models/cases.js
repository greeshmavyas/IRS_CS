const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var casesSchema = new Schema({
  userID: {
    type: String,
  },
  caseID: {
    type: String,
  },
  organisationID: {
    type: String,
  },
  category: {
    type: String,
  },
  Information: {
    type: String,
  },
  Status: {
    type: String,
  },
  ResolutionComments: {
    type: String,
  },
  AgentID: {
    type: String,
  },
});

const cases = mongoose.model("case", casesSchema);
module.exports = cases;

