var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);

  // Import models
  require('../app/models/user');
  require('../app/models/place');
  require('../app/models/track');

  return db;
};
