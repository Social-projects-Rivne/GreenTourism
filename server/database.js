var Sequelize = require('sequelize');
var db = new Sequelize('test_greentourism', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',

  define: {
    timestamps: true
  }
});

// Test connection
db.authenticate().then(function() {
  console.log('Connection has been established successfully.');
}).catch(function(err) {
  console.log('Unable to connect to the database:', err);
});

module.exports = db;
