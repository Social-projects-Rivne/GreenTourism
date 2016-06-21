var exports = module.exports = {};

exports.list = function(model) {
  var listController = function(req, res) {
    var whereClause = req.query ? {where: req.query} : {};

    model.findAll(whereClause).then(function(places) {
      res.json(places);
    });
  };

  return listController;
};

exports.show = function(model) {
  var showController = function(req, res) {
    model.findById(req.params.id).then(function(place) {
      if (!place) {
        res.status(404).json({message: 'Record with id ' + req.params.id +
                             ' was not found!'});
      } else {
        res.json(place);
      }
    });
  };

  return showController;
};

exports.create = function(model) {
  var createController = function(req, res) {
    if (!req.body) {
      res.sendStatus(400);
    } else {
      model.create(req.body)
        .then(function(place) {
          res.status(201).json({message: 'Record was successfully created!',
                                place: place});
        })
        .catch(function(err) {
          res.status(400).json({errors: err.errors});
        });
    }
  };

  return createController;
};

exports.update = function(model) {
  var updateController = function(req, res) {
    if (!req.body) {
      res.sendStatus(400);
    } else {
      model.update(req.body, {where: {id: req.params.id}})
        .then(function() {
          res.status(200).json({message: 'Record ' + req.params.id +
                                ' was successfully updated'});
        })
        .catch(function(err) {
          res.status(400).json({errors: err.errors});
        });
    }
  };

  return updateController;
};

exports.delete = function(model) {
  var deleteController = function(req, res) {
    model.destroy({where: {id: req.params.id}})
    .then(function() {
      res.status(200).json({message: 'Record ' + req.params.id +
                            ' was successfully deleted'});
    })
    .catch(function(err) {
      res.status(400).json({errors: err.errors});
    });
  };

  return deleteController;
};
