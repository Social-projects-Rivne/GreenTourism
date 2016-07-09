var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  type: String,
  photo: Array,
  like: Array,
  user_id: Number,
  rate: Number
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

PlaceSchema.virtual('stars').get(function () {
  this.rate = this.like.length;
  this.save();
});

module.exports = mongoose.model('Place', PlaceSchema);
