const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var agentSchema = new Schema({
  organisationID: {
    type: Int32,
  },
  agentID: {
    type: Int32,
  },
  category: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  skills: {
    type: [],
  }
});

module.exports = agentDetails = mongoose.model('agentDetails', agentSchema);