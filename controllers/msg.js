var User = require('../models/user');
var Message = require('../models/message');
//var config = require('../config/email');

//var sendgrid = require('sendgrid')(config.emailAccount, config.emailPassword);

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

var msgController = {

  displayMsgs: function(req, res){

    Message.find({}, function(err, msgsFromDB) {
      if (err)
        console.log("err");
      
      var msgsFromDBFilter = [];

      for (var i=0; i<msgsFromDB.length; i++) {
        if ((msgsFromDB[i].invite.name === req.user.name) || (msgsFromDB[i].beinvited.name === req.user.name)) {
          msgsFromDBFilter.push(msgsFromDB[i]);
        }
      }

      
      res.render("messages",{
        user: req.user,
        msgs:msgsFromDBFilter
      });
    });
  },

  displayMsg: function(req, res) {
    var msgid = req.params.id;
    Message.findById(msgid, function(err, result){
      res.send(result);
    });
  },

  saveMsg: function(req, res) {
    //console.log("data from client:",req.body);

    User.findOne({_id:req.body.playerid}, function(err, result){
      
      //console.log(req.body.todaydate);
      
      var messageLog = req.body.todaydate + " - " + req.user.name + " : " + req.body.content;

      var msg = {
        invite: req.user,
        beinvited: result,
        courtname: req.body.courtname,
        courtlocation: req.body.courtaddress,
        playdate: req.body.playdate,
        playtime: req.body.playtime,
        msgdate: req.body.todaydate,
        content: messageLog,
        status: "Open",
      };
    
      //console.log(msg);

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
  },

  updateMsg: function(req, res) {
    console.log(req.body.msgid);

    var messageLog = req.body.todaydate + " - " + req.user.name + " : " + req.body.content;    
    //console.log("message:", messageLog);
    
    Message.findOne({_id:req.body.msgid}, function(err, result){
      // if (result.courtname != req.body.courtname)
      //    Message.update({_id:req.body.msgid}, {courtname:req.body.courtname}, function(err) {});        
      result.content.push(messageLog);
      Message.update({_id:req.body.msgid}, {content:result.content}, function(err) {});
    });
    
    // var umsg = {
    //   courtname: req.body.courtname,
    //   courtlocation: req.body.courtlocation,
    //   playdate: req.body.playdate,
    //   playtime: req.body.playtime,
    //   content: messageLog,
    // };

    // Message.update(
    //   {_id:req.body.msgid}, 
    //   {content:messageLog},
    //   function(err) {

    //   }
    // );
    
    //   // {courtname: req.body.courtname},
    //   // {courtlocation: req.body.courtlocation},
    //   // {playdate: req.body.playdate},
    //   // {playtime: req.body.playtime},
    // //console.log(umsg);

    // Message.update({_id:req.body.msgid}, 
    //   {$set:{content: messageLog}}
    // );
  },

  closeMsg: function(req, res) {
    Message.findOne({_id:req.body.msgid}, function(err, result){
      Message.update({_id:req.body.msgid}, {status:req.body.status}, function(err) {});
    });
  }
};

// Export our index control
module.exports = msgController;