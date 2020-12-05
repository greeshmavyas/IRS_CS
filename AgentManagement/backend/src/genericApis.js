"use strict";
const nodemailer = require("nodemailer");

let Case = require("../src/models/CaseModel");
let CaseHistory = require("../src/models/CaseHistory");

const getTodayDate = () =>{
  var today = new Date();
  var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + round(today.getDate());
  var time =
  round(today.getHours()) + ":" + round(today.getMinutes()) + ":" + round(today.getSeconds());
  var dateTime = date + " " + time;
  return dateTime
}

const round = (value) =>{
  console.log(value);
  value=value+"";
  return (value && value.length < 2 ? "0"+value : value)
}

const sendNotification = (caseId, subject, body) =>{
  Case.findOne({CaseID: caseId}, function(err, resCase){
    if(err){
      console.log(err)
    } else if(resCase){ 
      console.log("in send notiifcation");
      let subscribers = resCase.Subscribers
      if(subscribers && subscribers.length > 0)
        notify(subscribers, subject, body)
    }
  })
}

const notify = async (subscribers, subject, body) => {
  console.log("in notify:");
  console.log(subscribers);
  console.log(subject);
  console.log(body);
  if(!subscribers || !subject || !body){
    return
  }

  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "irs.system1@gmail.com", // generated ethereal user
      pass: "irs@sjsu", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"IRS Service" <irs.system1@gmail.com>', // sender address
    to: subscribers, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
    html: body
  });

}

const addHistory = async (userID, caseID, comment, type)=>{
  console.log("userID:"+userID+"..caseID:"+caseID+"..comment:"+comment)
    let history = new CaseHistory();
    history.UserID = userID;
    history.CaseID = caseID;
    history[type] = comment;
    history.UpdatedOn =  getTodayDate();
    try{
      let resp = await history.save()
      return resp ? true: false
    } catch(err){
      console.log(err);
      return false;
    }
  }

/*const addHistory = (userID, caseID, comment)=>{
    console.log("userID:"+userID+"..caseID:"+caseID+"..comment:"+comment)
    Case.findOne({ UserID: userID, CaseID: caseID }, function (err, resCase) {
        if (err) {
          console.log(err);
          return false;
        } else {
          //console.log(resIssue);
          //resCase.Status = comment;
          //resCase.save();
          let history = new CaseHistory();
          history.UserID = userID;
          history.CaseID = caseID;
          history.Comment = comment;
          var today = new Date();
          var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          var time =
            today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date + " " + time;
          history.UpdatedOn = dateTime;
          history
            .save()
            .then((history) => {
              /*res
                .status(200)
                .json({ Case: "Your case updated in history successfully" });
                console.log("history updated")
                return true;
            })
            .catch((err) => {
              //res.status(400).send("Can not create Case");
              console.log(err)
              return false;
            });
            return false;
          //res.json(resCase);
        }
      });
}*/
module.exports = {
    getTodayDate: getTodayDate,
    addHistory: addHistory,
    sendNotification: sendNotification
}