var Sequelize = require('sequelize');
var db = require('../database');

var Place = db.define('place', {
  name: {type: Sequelize.STRING, allowNull: false},
  description: {type: Sequelize.TEXT, allowNull: false},
  latitude: {type: Sequelize.STRING, allowNull: false},
  longitude: {type: Sequelize.STRING, allowNull: false},
  type: {type: Sequelize.STRING, allowNull: false} //type: Sequelize.INTEGER,
  //ownerId: Sequelize.INTEGER
});

// Create table
Place.sync({force: false}); /*.then(function() {
  return Place.create({
    latitude: '50.6202',
    longitude: '26.2516',
    name: 'point1',
    description: 'description ......... for point2',
    type: 'Camp'
  });
});
*/

module.exports = Place;
