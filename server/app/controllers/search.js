var Search = require('mongoose').model('Place');
var Track = require('mongoose').model('Track');
exports.list = function(req, res) {

  var name = req.query.name;
  var regex = new RegExp(req.query.name, 'i');
 // delete req.query.name;

  var searchBy = req.query.searchBy;
  //delete req.query.searchBy;
  if (searchBy == 'place') {
    //console.log("search by Places");
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
   // var name = req.query.name;
   // var regex = new RegExp(req.query.name, 'i');
    //delete req.query.name;

   // var searchBy = req.query.searchBy;
   // delete req.query.searchBy;
   // console.log("search by Tracks");
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