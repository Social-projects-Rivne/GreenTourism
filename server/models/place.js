var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  description: String,
  lat: String,
  lon: String,
  type: String, //type: Number,
  photo: Array,
  userId: String
});

module.exports = mongoose.model('Place', PlaceSchema);
