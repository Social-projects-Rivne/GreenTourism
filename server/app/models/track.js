var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./schema/comment');

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
    type: {
      type: String,
      default: 'LineString',
      enums: ['LineString'],
      required: true
    },
    coordinates: {
      type: [[Number]],
      required: true
    }
  },
  places: [{
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  }],
  description: String,
  rate: Number,
  likes: [Schema.Types.ObjectId],
  photos: [String],
  comments: [CommentSchema]
});

var autoPopulateOwner = function(next) {
  this.populate('owner');
  next();
};
TrackSchema.pre('findOne', autoPopulateOwner).pre('find', autoPopulateOwner);

var autoPopulatePlaces = function(next) {
  this.populate('places');
  next();
};
TrackSchema.pre('findOne', autoPopulatePlaces).pre('find', autoPopulatePlaces);

module.exports = mongoose.model('Track', TrackSchema);
