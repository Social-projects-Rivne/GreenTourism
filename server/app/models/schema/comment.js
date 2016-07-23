var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  content: {
    type: String,
    maxlength: [1000, 'The value exceeds the maximum allowed length ({MAXLENGTH}).'],
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
