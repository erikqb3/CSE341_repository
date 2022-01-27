const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (cb) => {
  MongoClient.connect('mongodb+srv://erikqb3:DiscipleofChrist_2408@cluster0.dijlh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(client => {
  console.log('Connected!');
  cb(client);
})
.catch(err => {
  console.log(err);
})
}

module.exports = mongoConnect;



