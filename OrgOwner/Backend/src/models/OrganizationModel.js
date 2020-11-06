const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Organization = new Schema({
  OrgID: {
    type: String,
  },
  OrgOwnerId: {
    type: String,
  },
  OrgName: {
    type: String,
  },
  Categories: {
    type: Array,
  },
  Domain: {
    type: String,
  },
});

module.exports = mongoose.model("Organization", Organization);
