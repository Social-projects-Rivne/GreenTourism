var Sequelize = require('sequelize');
var db = require('../database');

var Place = db.define('place', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  lat: Sequelize.STRING,
  lon: Sequelize.STRING,
  type: Sequelize.STRING //type: Sequelize.INTEGER,
  //ownerId: Sequelize.INTEGER
});

// Create table
Place.sync({force: false}); /*.then(function() {
  return Place.create({
    lat: '50.6202',
    lon: '26.2516',
    name: 'point1',
    description: 'description ......... for point2',
    type: 'Camp'
  });
});
*/

module.exports = Place;

/* Mongo version:
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  description: String,
  lat: String,
  lon: String,
  type: String, //type: Number,
  photo: Array,
  //ownerId: Number
});

module.exports = mongoose.model('Place', PlaceSchema);



var place = new Place({
  'lat': '50.6202',
  'lon': '26.2516',
  'id': '1',
  'name': 'point1',
  'description': 'description ......... for point2',
  'photo': ['/images/point1/img1.jpeg',
    '/images/point1/img2.jpeg'
  ],
  'type': 'Camp'
});

place.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Place save!');
  }
});

*/
