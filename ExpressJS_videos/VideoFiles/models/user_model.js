const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const dv = getDB();
    return Db.collection('users').insertOne(this);
  }

  static findById(userId) {
    const db = getDB();
    return db
    .collection('users')
    .findOne({_id: new Object(userId)})
  }
}

module.exports = User;