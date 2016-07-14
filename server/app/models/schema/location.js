var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  type: {
    type: String,
    required: true
  },
  coordinates: {
    type: Array,
    required: true
  }
});