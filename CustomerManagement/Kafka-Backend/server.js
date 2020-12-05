var connection = new require("./kafka/Connection");
// Set up Database connection
var config = require("./config/settings");
var mongoose = require("mongoose");
var connStr =
    config.database_type +
    "+srv://" +
    config.database_username +
    ":" +
    config.database_password +
    "@" +
    config.database_host +
    ":" +
    "/" +
    config.database_name;
console.log(connStr);
mongoose.connect(connStr, {
    useNewUrlParser: true,
    poolSize: 10
}, function(
    err
) {
    if (err) throw err;
    else {
        console.log("Successfully connected to MongoDB");
    }
});

console.log("Kafka server is running ");
connection.handleTopics();