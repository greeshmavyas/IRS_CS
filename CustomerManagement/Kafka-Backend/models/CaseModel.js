const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Case = new Schema({
  CaseID: {
    type: String,
  },
  UserId: {
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
  AgentId: {
    type: String,
  },
});

module.exports = mongoose.model("Case", Case);
