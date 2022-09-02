const mongodb = require('mongodb');

const mongoDbClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    mongoDbClient.connect(
      'mongodb://cmdlhrltx03:27017'
    )
      .then(client => {
        console.log('MongoDb Connected Successfully!');
        _db = client.db('myStore');
        callback();
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };
  
  const getDb = () => {
    if (_db) {
      return _db;
    }
    throw 'No database found!';
  };

  exports.mongoConnect = mongoConnect;
  exports.getDb = getDb;