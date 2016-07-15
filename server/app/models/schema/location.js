var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  type: {
    type: String,
    default: 'Point',
    enums: ['Point'],
    required: true
    // TODO: Add validation - not more 2 elements in array
  },
  coordinates: {
    type: [Number],
    required: true
  }
});