var db = process.env.MONGO_DATABASE_URL ||
  'mongodb://user:qwerty1234@ds019664.mlab.com:19664/test_greentourism';

module.exports = {
  db: db,
  sessionSecret: 'developmentSessionSecret',
  sql: {
    username: 'root',
    password: '',
    database: 'sql_greentourism',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
