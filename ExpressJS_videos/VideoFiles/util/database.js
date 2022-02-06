const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let local_db;
// vqwbmJ3YhtrskKAE
const mongoConnect = (cb) => {
  // MongoClient.connect('mongodb+srv://erikqb3:1KobeR.Shoryu_red@cse431.dijlh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority') // original -> mongodb+srv://erikqb3:DiscipleofChrist_2408@cluster0.dijlh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  MongoClient.connect("mongodb+srv://erikq3:vqwbmJ3YhtrskKAE@cse431shopproject.wlbdo.mongodb.net/shop?retryWrites=true&w=majority")

  .then(client => {
  // console.log('Connected!');
  local_db = client.db();
  cb();
})
.catch(err => {
  console.log(err);
  throw err;
})
}

const getDB = () => { //function
  if (local_db) {
    return local_db;
  }
  throw "No Database Found!"
};

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;



