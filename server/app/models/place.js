var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./schema/comment');
var LocationSchema = require('./schema/location');

var PlaceSchema = new Schema({
  name: {
    type: String,
    maxlength: [100, 'The value exceeds the maximum allowed length ({MAXLENGTH}).'],
    required: true
  },
  description: {
    type: String,
    maxlength: [1000, 'The value exceeds the maximum allowed length ({MAXLENGTH}).']
  },
  location: LocationSchema,
  address: {
    type: String,
    maxlength: [100, 'The value exceeds the maximum allowed length ({MAXLENGTH}).']
  },
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
  timestamps: true,
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
