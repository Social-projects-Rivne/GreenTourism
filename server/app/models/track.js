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
  likes: [Schema.Types.ObjectId],
  photos: [String],
  comments: [CommentSchema],
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

TrackSchema.virtual('stars').get(function() {
  this.rate = this.likes.length;
  this.save();
});

var autoPopulatePlaces = function(next) {
  this.populate('places');
  next();
};
TrackSchema.pre('findOne', autoPopulatePlaces).pre('find', autoPopulatePlaces);

module.exports = mongoose.model('Track', TrackSchema);
