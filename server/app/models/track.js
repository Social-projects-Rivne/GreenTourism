var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var locSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  coordinates: {
    type: Array,
    required: true
  }
});

var TrackSchema = new Schema({
  name: { 
    type: String,
    required: true
  },
  description: String,
  loc: locSchema,
  type: {
    type: String,
    required: true
  },
  photos: Array,
  userId: Number,
  trackRate: Number
});

module.exports = mongoose.model('Track', TrackSchema);
