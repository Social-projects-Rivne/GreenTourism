var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  type: String,
  photos: [Schema.Types.Mixed],
  likes: [Schema.Types.Mixed],
  userId: String,
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
  this.rate = this.likes.length;
  this.save();
});

module.exports = mongoose.model('Place', PlaceSchema);
