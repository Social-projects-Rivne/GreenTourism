exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'User is not logged in'
    });
  }

  next();
};

exports.hasAuthorization = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'User is not logged in'
    });
  }

  if (req.user.role !== 'admin' || req.params.id !== req.user._id) {
    return res.status(403).json({
      message: 'User is not authorized'
    });
  }

  next();
};

exports.isAdmin = function(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'User is not an admin'
    });
  }

  next();
};
