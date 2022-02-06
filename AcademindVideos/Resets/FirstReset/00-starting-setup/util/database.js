const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://erikqb3:1KobeR.Shoryu_red@finalcse431shop.wlbdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" //USE THIS FOR COMPASS: mongodb+srv://erikqb3:1KobeR.Shoryu_red@finalcse431shop.wlbdo.mongodb.net/test
    )
  .then(client => {
    console.log("CONNECTED, database/9");
    _db = client.db();
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
  throw 'No databse found!, database.js/util 25';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
