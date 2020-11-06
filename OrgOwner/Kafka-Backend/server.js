var connection = new require("./kafka/Connection");

//topics file
var customerIssueCreationBilling = require("./services/customerIssueCreationBilling.js");

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
mongoose.connect(connStr, { useNewUrlParser: true, poolSize: 10 }, function (
  err
) {
  if (err) throw err;
  else {
    console.log("Successfully connected to MongoDB");
  }
});

console.log("Kafka server is running ");

function handleTopicRequest(topic_name, fname) {
  console.log("topic_name:", topic_name);
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  var str = JSON.stringify(producer);
  consumer.on("error", function (err) {
    console.log("Kafka Error: Consumer - " + err);
  });
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    switch (topic_name) {
      case "billing":
        customerIssueCreationBilling.customerIssueCreationBillingService(
          data.data,
          function (err, res) {
            response(data, res, producer);
            return;
          }
        );
        break;
    }
  });
}

function response(data, res, producer) {
  console.log("after handle", res);
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res,
      }),
      partition: 0,
    },
  ];
  producer.send(payloads, function (err, data) {
    console.log("producer send", data);
  });
  return;
}

//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("billing", customerIssueCreationBilling);
