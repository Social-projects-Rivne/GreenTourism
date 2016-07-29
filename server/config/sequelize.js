var config = require('./config');
var Sequelize = require('sequelize');

module.exports = function() {
  var sql = new Sequelize(config.sql.database, config.sql.username, config.sql.password, {
    host: config.sql.host,
    dialect: config.sql.dialect,
    define: {
      timestamps: true
    }
  });

// Test connection
  sql.authenticate().then(function() {
    console.log('Connection has been established successfully.');
  }).catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

  return sql;
};
