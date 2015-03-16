var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  invite: Object,
  beinvited: Object,
  courtname: String,
  courtlocation: String,
  playdatetime: Date,
  msgdate: String,
  content: [String],
  status: String
});

module.exports = mongoose.model('message', messageSchema);