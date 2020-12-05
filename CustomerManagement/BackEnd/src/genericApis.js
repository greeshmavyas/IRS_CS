"use strict";
const nodemailer = require("nodemailer");

let Case = require("../src/models/CaseModel");
let CaseHistory = require("../src/models/CaseHistory");

const getTodayDate = () =>{
    var today = new Date();
    var date =
    today.getFullYear() + "-" + round(today.getMonth() + 1) + "-" + round(today.getDate());
    var time =
    round(today.getHours()) + ":" + round(today.getMinutes()) + ":" + round(today.getSeconds());
    var dateTime = date + " " + time;
    console.log("date time is:"+dateTime);
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

/*const addHistory = (userID, caseID, comment)=>{
    console.log("userID:"+userID+"..caseID:"+caseID+"..comment:"+comment)
      let history = new CaseHistory();
      history.UserID = userID;
      history.CaseID = caseID;
      history.Comment = comment;
      history.UpdatedOn =  getTodayDate();
      history
        .save()
        .then((history) => {
            console.log("history updated")
            return true;
        })
        .catch((err) => {
          console.log(err)
          return false;
        });
        return false;
}*/

const addHistory = async (userID, caseID, comment)=>{
  console.log("userID:"+userID+"..caseID:"+caseID+"..comment:"+comment)
    let history = new CaseHistory();
    history.UserID = userID;
    history.CaseID = caseID;
    history.Comment = comment;
    history.UpdatedOn =  getTodayDate();
    try{
      let resp = await history.save()
      return resp ? true: false
    } catch(err){
      console.log(err);
      return false;
    }
  /*  await history
      .save()
      .then((history) => {
          console.log("history updated")
          return true;
      })
      .catch((err) => {
        console.log(err)
        return false;
      });
      return false;*/
}

module.exports = {
    getTodayDate: getTodayDate,
    addHistory: addHistory,
    sendNotification: sendNotification
}