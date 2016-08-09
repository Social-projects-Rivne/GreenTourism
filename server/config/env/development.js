module.exports = {
  db: process.env.MONGO_DATABASE_URL ||
    'mongodb://user:qwerty1234@ds019664.mlab.com:19664/test_greentourism',
  sql: {
    username: 'sql8130683',
    password: '1k5qHjg5jP',
    database: 'sql8130683',
    host: 'sql8.freesqldatabase.com',
    port: '3306',
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
    callbackURL: 'https://green-tourism.herokuapp.com/api/auth/google/callback'
  },
  mail: {
    auth: {
      api_user: 'green_tourism',
      api_key: 'rv017.webui'
    }
  }
};
