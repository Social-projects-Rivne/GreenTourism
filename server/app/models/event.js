var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./schema/comment');
var LocationSchema = require('./schema/location');

var EventSchema = new Schema({
  // TODO: add required for almost all fields
  name: String,
  description: String,
  photos: [String],
  type: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dateStart: Number,
  dateEnd: Number,
  location: LocationSchema,
  price:Number,
  track:String,
  status: String,
  rate: Number,
  comments: [CommentSchema]
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Event', EventSchema);
