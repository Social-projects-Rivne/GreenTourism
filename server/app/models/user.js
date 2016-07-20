var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var SALT_ROUNDS = 5;

var UserSchema = new Schema({
  email: {
    type: String,
    unique: 'E-mail must be unique',
    required: 'E-mail is required',
    // TODO: E-mail should not have special characters (except -, _, .), replace dots
    match: [/.+@.+\..+/, 'Please fill a valid e-mail address']
  },
  password: {
    type: String,
    required: 'Password is required',
    validate: [
      function(password) {
        return password && password.length >= 6;
      }, 'Password should be longer'
    ]
  },
  firstName: {
    type: String,
    required: 'First name is required'
  },
  lastName: {
    type: String,
    required: 'Last name is required'
  },
  avatar: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {},
  createdAt: {
    type: Date,
    default: Date.now
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(next) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return next();

  // Password changed so we need to hash it
  bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;

      next();
    });
  });
});

// Check if user password matching given one
UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
