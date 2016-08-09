var Search = require('mongoose').model('Place');
var Track = require('mongoose').model('Track');
exports.list = function(req, res) {

  var name = req.query.name;
  var regex = new RegExp(req.query.name, 'i');

  var searchBy = req.query.searchBy;
  if (searchBy == 'place') {
    Search.find({name: regex},
      function(err, records) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json(records);
        }
      });
  }
  else if (searchBy == 'track') {
    Track.find({name: regex},
      function(err, records) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json(records);
        }
      });

  }
};
