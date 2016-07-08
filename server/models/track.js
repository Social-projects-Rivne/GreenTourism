var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrackSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  trackPoints: Array,
  type: String,
  photo: Array,
  userId: Number,
  trackRate: Number,
  color: String
});

module.exports = mongoose.model('Track', TrackSchema);
