const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var agentSchema = new Schema({
  organisationID: {
    type: String,
  },
  agentID: {
    type: String,
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