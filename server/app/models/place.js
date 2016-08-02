var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./schema/comment');
var LocationSchema = require('./schema/location');

var PlaceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  location: LocationSchema,
  address: String,
  type: {
    type: String,
    required: true
  },
  photos: [String],
  likes: [Schema.Types.ObjectId],
  comments: [CommentSchema],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rate: Number
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

PlaceSchema.virtual('stars').get(function() {
  this.rate = this.likes.length;
  this.save();
});

module.exports = mongoose.model('Place', PlaceSchema);
