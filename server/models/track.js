var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrackSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  track_points: Array,
  type: String,
  photo: Array,
  userId: Number,
  track_rate: Number,
  color: String
});

module.exports = mongoose.model('Track', TrackSchema);
