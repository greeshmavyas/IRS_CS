const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CaseHistory = new Schema({
  UserID: {
    type: String,
  },
  CaseID: {
    type: String,
  },
  Category: {
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
  CreatedOn: {
    type: String,
  },
  UpdatedOn: {
    type: String,
  }
});

module.exports = mongoose.model("CaseHistory", CaseHistory);
