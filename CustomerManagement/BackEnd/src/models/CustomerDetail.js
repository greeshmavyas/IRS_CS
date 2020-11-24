const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CustomerDetail = new Schema({
  CustomerID: {
    type: String,
  },
  Email: {
    type: String,
  },
  CustomerName: {
    type: String,
  },
  OrganisationID: {
    type: String,
  },
});

module.exports = mongoose.model("CustomerDetail", CustomerDetail);
