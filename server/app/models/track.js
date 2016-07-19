var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./schema/comment');

var locSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  coordinates: {
    type: Array,
    required: true
  }
});

var TrackSchema = new Schema({
  name: { 
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: locSchema,
    required: true
  },
  description: String,
  trackRate: Number,
  likes: [Schema.Types.ObjectId],
  address: String,
  photos: [String],
  comments: [CommentSchema]
});

module.exports = mongoose.model('Track', TrackSchema);
