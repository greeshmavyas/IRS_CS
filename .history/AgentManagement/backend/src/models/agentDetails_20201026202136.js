const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var agentSchema = new Schema({
  organisationID: {
    type: Number,
  },
  agentID: {
    type: Number,
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