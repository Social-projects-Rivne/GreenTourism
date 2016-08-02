var db = process.env.MONGO_DATABASE_URL ||
  'mongodb://user:qwerty1234@ds019664.mlab.com:19664/test_greentourism';

module.exports = {
  db: db,
  sql: {
    username: 'root',
    password: '',
    database: 'sql_greentourism',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientID: '1626051384389779',
    clientSecret: '6d0b876c83e0edc2e55748a3709e36f0',
    callbackURL: 'https://green-tourism.herokuapp.com/api/auth/facebook/callback'
  },
  google: {
    clientID: '54757690485-qi1sur7efphqrii06aoafdon990k1vr0.apps.googleusercontent.com',
    clientSecret: 'Bk0dYxY_fU6GIk1UBxxEIcSz',
    callbackURL: 'https://green-tourism.herokuapp.com/api/auth/facebook/callback'
  }
};
