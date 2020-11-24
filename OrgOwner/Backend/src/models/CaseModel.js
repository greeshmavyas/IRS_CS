const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Case = new Schema({
  UserId: {
    type: String,
  },
  OrgId: {
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
});

module.exports = mongoose.model("Case", Case);
