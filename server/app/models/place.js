var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  type: String,
  photo: Array,
  userId: Number,
  rate: Number
});

module.exports = mongoose.model('Place', PlaceSchema);
