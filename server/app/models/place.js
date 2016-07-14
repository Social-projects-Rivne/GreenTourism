var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content: {
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

var LocationSchema = new Schema({
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
  location: LocationSchema,
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
