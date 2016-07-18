var User = require('mongoose').model('User');

exports.list = function(req, res) {
  var limit = req.query.limit;
  delete req.query.limit;

  var sort = req.query.sort;
  delete req.query.sort;

  var skip = req.query.skip;
  delete req.query.skip;

  User.find(req.query, null, {limit: limit, skip: skip, sort: sort},
    function(err, users) {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json(users);
    });
};

exports.show = function(req, res) {
  var callback = function(err, user) {
    if (err) {
      return res.status(404).json(err);
    }

    return res.json(user);
  };

  var fields = '-password -provider -providerId -providerData -createdAt' +
               ' -updatedAt -role';

  if (req.user.role === 'admin') {
    User.findById(req.params.id, fields, {}, callback);
  } else if (req.params.id == req.user._id) { // eslint-disable-line eqeqeq
    User.findById(req.user._id, fields, {}, callback);
  }
};

exports.showMe = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) {
      return res.status(404).json(err);
    }

    return res.json(user);
  });
};

exports.update = function(req, res) {
  var callback = function(err, user) {
    if (err) {
      return res.status(400).json(err);
    }

    for (var key in req.body) {
      if ({}.hasOwnProperty.call(req.body, key)) {
        user.set(key, req.body[key]);
      }
    }

    user.save(function(err) {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json({
        message: 'User ' + req.params.id + ' was successfully updated',
        user: user
      });
    });
  };

  if (req.user.role === 'admin') {
    User.findById(req.params.id, callback);
  } else if (req.params.id == req.user._id) { // eslint-disable-line eqeqeq
    User.findById(req.user._id, callback);
  }
};

exports.delete = function(req, res) {
  var callback = function(err) {
    if (err) {
      return res.status(400).json(err);
    }

    return res.json({
      message: 'User ' + req.params.id + ' was successfully deleted'
    });
  };

  if (req.user.role === 'admin') {
    User.findById(req.params.id, callback);
  } else if (req.params.id == req.user._id) { // eslint-disable-line eqeqeq
    User.findByIdAndRemove(req.user._id, callback);
  }
};
