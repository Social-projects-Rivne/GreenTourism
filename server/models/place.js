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
