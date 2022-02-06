const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collectio('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
     return cp.productId.toString() === product._id.toString(); //make sure id are same type
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items]; //create new array with all existing items in cart

    if (cartProductIndex >= 0) { //if product already exists
      newQuantity = this.cart.items[cartProductIndex].quantity + 1; //get new quantity
      updatedCartItems[cartProductIndex].quantity = newQuantity; // adjust quantity of existing product
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id), //push ID of new product
        quantity: newQuantity // push quanity which is default 1 from line 23
      });
    }
    const updatedCart = { 
      items: updatedCartItems //updated cart info
    };
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: {cart: updatedCart} }
      );
    }

    getCart() {
      const db = getDb();
      const productIds = this.cart.items.map(i => {
        return i.prodcutId; //get an array of product IDs from cart
      });
      return db
      .collection('products') //pull from database
      // .find({_id: {$in: []} }) //look for id's in 
      .find({_id: {$in: productId} }) //look for id's in 
      .toArray() //put it back into an array of product IDs
      .then(products => { //loop through the array
        return products.map(p => { //create a new array...
          return {
            ... p, //that holds existing product qualities...
            quantity: this.cart.items.find(i => {  // and adds quantity quality
              return i.productId.toString() === p._id.toString(); //double check
            }).quantity // put it into array that has both qualities and quantities
          };
        });
      });
    }

  static findById(userId) {
    const db = getDb();
    return db
    .collection('users')
    .findOne({ _id: new ObjectId(userId) })
    .then(user => {
      // console.log(user,"USER,user_model/40");
      return(user);
    })
    .catch(err => {
      console.log(err);
    });
  }
}

module.exports = User;
