var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

var locationSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  coordinates: {
    type: Array,
    required: true
  }
});

var PlaceSchema = new Schema({
  name: String,
  description: String,
  loc: locationSchema,
  type: String,
  photos: [String],
  likes: [String],
  comments: [CommentSchema],
  userId: {
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

var autoPopulateLead = function(next) {
  this.populate('comments.author');
  next();
};
PlaceSchema.pre('findOne', autoPopulateLead).pre('find', autoPopulateLead);

PlaceSchema.virtual('stars').get(function() {
  this.rate = this.likes.length;
  this.save();
});

module.exports = mongoose.model('Place', PlaceSchema);
