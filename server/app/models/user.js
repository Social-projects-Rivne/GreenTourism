var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var SALT_ROUNDS = 5;

var UserSchema = new Schema({
  role: {
    type: String,
    lowercase: true,
    enum: ['user', 'manager', 'admin'],
    default: 'user',
    required: true
  },
  email: {
    type: String,
    unique: 'Email must be unique',
    required: 'Email is required',
    match: [/^[\w][\w\.\-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/,
            'Please fill a valid e-mail address'],
    trim: true
  },
  password: {
    type: String,
    validate: [
      function(password) {
        return password && password.length >= 8;
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
  nickname: {
    type: String
  },
  phone: {
    type: String,
    match: [/\+\d{1,4}\d{9}/, 'Invalid phone number'],
    trim: true
  },
  address: {
    type: String
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
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

// Execute before each user.save() call
UserSchema.pre('save', function(next) {
  var user = this;

  // Set gravatar if no avatar provided by user
  if (!user.avatar) {
    var gravatar = crypto.createHash('md5').update(user.email).digest('hex');
    user.avatar = 'https://secure.gravatar.com/avatar/' + gravatar + '?s=480';
  }

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
