var User = require('../models/user');
var Message = require('../models/message');
var config = require('../config/email');

var sendgrid = require('sendgrid')(config.emailAccount, config.emailPassword);

var sendEmail = function(msg) {
  var emailsubject = msg.invite.name + " is inviting you to play tennis on " + msg.playdatetime;
  var emailbody = "Court Name: " + msg.courtname + "\n\r" + 
    "Court Location: " + msg.courtlocation + "\n\r" + 
    "Date & Time: " + msg.playdatetime + "\n\r\n\r" + 
    msg.content + "\n\r\n\r" + "http://127.0.0.1:5297";

  // console.log(msg.invite.email);
  // console.log(msg.beinvited.email);
  // console.log(emailsubject);
  // console.log(emailbody);

  // sendgrid.send({
  //   to: msg.beinvited.email,
  //   from: msg.invite.email,
  //   subject: emailsubject,
  //   text: emailbody}, function(err, result) {
  //     if (err) {
  //       return "email failed!";
  //     } else {
  //       return "email send!";
  //     }
  // });
}

var commController = {
  msgData: function(req, res){
    //console.log("data from client:",req.body);

    User.findOne({_id:req.body.playerid}, function(err, result){
      
      console.log(req.body.todaydate);

      var msg = {
        invite: req.user,
        beinvited: result,
        courtname: req.body.courtname,
        courtlocation: req.body.courtaddress,
        playdatetime: req.body.playdatetime,
        msgdate: req.body.todaydate,
        content: req.body.content,
        status: "open",
      };
    
      console.log(msg);

      // send email to notify 
      sendEmail(msg);    

      // save to message collection
      //console.log("current user", req.user);
      //console.log("player info", result);
      var msgDB = new Message(msg);
      msgDB.save();

      //res.redirect("/messages");
      res.send("success");

    });
  }
};

module.exports = commController;