var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
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