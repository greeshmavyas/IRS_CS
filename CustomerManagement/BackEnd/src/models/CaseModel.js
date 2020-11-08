const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Case = new Schema({
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
  Messages:[],
  Subscribers:[]
});

module.exports = mongoose.model("Case", Case);
