var Sequelize = require('sequelize');
var db = require('../database');

var Track = db.define('track', {
  name: {type: Sequelize.STRING, allowNull: false},
  description: {type: Sequelize.TEXT, allowNull: false},
  latitude: {type: Sequelize.STRING, allowNull: false},
  longitude: {type: Sequelize.STRING, allowNull: false},
  type: {type: Sequelize.STRING, allowNull: false} //type: Sequelize.INTEGER,
  //ownerId: Sequelize.INTEGER
});

// Create table
Track.sync({force: false}).then(function() {
  return Track.create({
    // Fields
  });
});

module.exports = Track;
