var kafka = require('kafka-node');
var customerIssueCreationBilling = require("../services/customerIssueCreationBilling.js");


function ConnectionProvider() {
    this.getConsumer = function(topic_name) {
        //if (!this.kafkaConsumerConnection) {
        this.client = new kafka.Client("localhost:2181");
        this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{
            topic: topic_name,
            partition: 0
        }]);
        this.client.on('ready', function() {
            console.log('Topic Consumer is ready for topic:', topic_name)
        })
        //}
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            console.log('Response Producer is ready!');
        }
        return this.kafkaProducerConnection;
    };

    //create consumer for all topics, 
    //so that messages are received and handled as the event occurs
    this.handleTopics = function() {

        this.client = new kafka.Client("localhost:2181");
        this.client.zk.client.getChildren("/brokers/topics", (err, children, stats) => {
            children.forEach(child => {
                //console.log("topic_name:", child);
                var consumer = this.getConsumer(child);
                var producer = this.getProducer();

                consumer.on("error", function(err) {
                    console.log("Kafka Error: Consumer - " + err);
                });
                consumer.on("message", function(message) {
                    console.log(JSON.stringify(message.value));
                    var data = JSON.parse(message.value);
                    customerIssueCreationBilling.customerIssueCreationBillingService(
                        data.data,
                        function(err, res) {
                            console.log("abcdef")
                            response(data, res, producer);
                            return;
                        }
                    );
                });
            });
        });
    }
}

function response(data, res, producer) {
    console.log("after handle", res);
    var payloads = [{
        topic: data.replyTo,
        messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
        }),
        partition: 0,
    }, ];
    console.log(payloads);
    producer.send(payloads, function(err, data) {
        console.log("producer send", data);
    });
    return;
}
exports = module.exports = new ConnectionProvider;