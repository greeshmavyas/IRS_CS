const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 4001;

const agentDetails = require('./src/routes/agentDetails')
const caseDetails = require('./src/routes/agentComments')
const mongoose = require("mongoose");
var config = require('./config/settings');
var connStr = config.mongoDB_connection_string;

app.set("view engine", "ejs");
app.use(cors({ origin: "http://54.219.173.10:3000", credentials: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://54.219.173.10:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());


var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

mongoose.connect(connStr, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

app.use('/', agentDetails);
app.use('/', caseDetails);


app.listen(port, () => console.log(`Prototype running on port ${port}`));