var Message = require('../models/message');

var msgController = {

  displayMsgs: function(req, res){

    Message.find({}, function(err, msgsFromDB) {
      // var index;
      // for (var i=0; i<usersFromDB.length; i++) {
      //   if (usersFromDB[i].email === req.user.email) {
      //     index = i;
      //     break;
      //   }
      // }

      // usersFromDB.splice(index,1);

      // console.log("messages", msgsFromDB);
      
      

      res.render("messages",{
        user: req.user,
        msgs: msgsFromDB
      });
    });
  },
  displayMsg: function(req, res) {
    var msgid = req.params.id;
    Message.findById(msgid, function(err, result){
      res.send(result);
    });
  }
};

// Export our index control
module.exports = msgController;