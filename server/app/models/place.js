var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./schema/comment');
var LocationSchema = require('./schema/location');

var PlaceSchema = new Schema({
  // TODO: add required for almost all fields
  name: String,
  description: String,
  location: LocationSchema,
  address: String,
  type: String,
  photos: [String],
  likes: [Schema.Types.ObjectId],
  comments: [CommentSchema],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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

var autoPopulateAuthor = function(next) {
  this.populate('comments.author');
  next();
};
PlaceSchema.pre('findOne', autoPopulateAuthor).pre('find', autoPopulateAuthor);

PlaceSchema.virtual('stars').get(function() {
  this.rate = this.likes.length;
  this.save();
});

module.exports = mongoose.model('Place', PlaceSchema);
