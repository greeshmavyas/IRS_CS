const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Agent = new Schema({
  OrgID: {
    type: String,
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Username: {
    type: String,
  },
  Password: {
    type: String,
  },
  Categories: {
    type: Array,
  },
  PhoneNumber: {
    type: String,
  },
});

module.exports = mongoose.model("Agent", Agent);
