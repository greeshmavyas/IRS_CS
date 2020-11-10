let Case = require("../src/models/CaseModel");
let CaseHistory = require("../src/models/CaseHistory");

const getTodayDate = () =>{
    var today = new Date();
    var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    return dateTime
}

const sendNotification = (caseId, subject, body) =>{
  Case.findOne({CaseID: caseId}, function(err, resCase){
    if(err){
      console.log(err)
    } else if(resCase){
      let subscribers = resCase.Subscribers
      notify(subscribers, subject, body)
    }
  })
}

const notify = async (subscribers, subject, body) => {
  if(!subscribers || !subject || !body){
    return
  }

  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "anbandar01@gmail.com", // generated ethereal user
      pass: "", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Anjali Bandaru" <anbandar01@gmail.com>', // sender address
    to: subscribers, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
    html: body
  });

}

const addHistory = (userID, caseID, comment)=>{
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
                .json({ Case: "Your case updated in history successfully" });*/
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
}
module.exports = {
    getTodayDate: getTodayDate,
    addHistory: addHistory,
    sendNotification: sendNotification
}