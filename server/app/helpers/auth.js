function isAuthenticated(req, res) {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      message: 'User is not logged in'
    });

    return false;
  }

  return true;
}

exports.isLoggedIn = function(req, res, next) {
  if (isAuthenticated(req, res)) {
    next();
  }
};

exports.isCurrentUser = function(req, res, next) {
  if (isAuthenticated(req, res)) {
    if (req.user.role === 'admin') {
      next();
    } else if (req.params.id == req.user._id) { // eslint-disable-line eqeqeq
      next();
    } else {
      return res.status(403).json({
        message: 'User is not authorized'
      });
    }
  }
};

exports.isAdmin = function(req, res, next) {
  if (isAuthenticated(req, res)) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'User is not an admin'
      });
    }

    next();
  }
};
