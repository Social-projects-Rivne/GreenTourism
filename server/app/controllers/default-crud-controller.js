var mongo = require('../helpers/mongo-queries');

module.exports = function(Model) {
  var controller = {};

  controller.list = function(req, res) {
    mongo.find(res, Model, req.query);
  };

  controller.show = function(req, res) {
    mongo.findById(res, Model, req.params.id);
  };

  controller.create = function(req, res) {
    mongo.insert(res, Model, req.body);
  };

  controller.update = function(req, res) {
    mongo.update(res, Model, req.params.id, req.body);
  };

  controller.delete = function(req, res) {
    mongo.remove(res, Model, req.params.id);
  };

  return controller;
};
