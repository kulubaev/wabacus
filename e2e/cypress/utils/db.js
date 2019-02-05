const Client = require('pg-native');

module.exports = {
  query: (text, values, cb) => {

    Client.connect({
      pgHost: postgres,
      pgDatabase: postgres,
      pgPassword: postgres_password,
      pgPort: 5432,
      pgUser: postgres

    },(err, client, done)=> {

      console.log(err);
      console.log('connected');
      client.query(text, values, (err, result) => {
        cb(err, result);
        done();
      });

    });
  }
}

