var User = require('../models/user');

var filterController = {

  filterPlayers: function(req, res){
    console.log(req.body);
    if (req.body.gender === "2") {
        User.find({
          ntrp: {$in:req.body.ntrp},
          location:req.body.location}, function(err, usersFromDB) {
            //console.log(usersFromDB);
            res.send({players:usersFromDB});
        });
    } else {
        User.find({
          gender: req.body.gender,
          ntrp: {$in:req.body.ntrp},
          location:req.body.location}, function(err, usersFromDB) {
            //console.log(usersFromDB);
            res.send({players:usersFromDB});
        });
    }
  }
};

// Export our index control
module.exports = filterController;