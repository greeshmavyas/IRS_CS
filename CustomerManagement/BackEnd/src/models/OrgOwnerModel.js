const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrgOwner = new Schema({
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
  ZipCode: {
    type: String,
  },
});

module.exports = mongoose.model("OrgOwner", OrgOwner);
