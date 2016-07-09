var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrackSchema = new Schema({
  name: String,
  description: String,
  trackPoints: Array,
  type: String,
  photos: Array,
  userId: Number,
  trackRate: Number
});

module.exports = mongoose.model('Track', TrackSchema);
