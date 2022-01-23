const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path')

const p = path.join( //have a global so all functions have access
  rootDir,
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // id = id of product, productPrice = productPice (maybe use this)
    // Fetch the previous cart (line 18 start)
    // Analyze the cart => Find existing product (line 25 start)
    // Add new product/ increas quanity (line 28 start)
    // NOTE: USE THIS TO DOCUMENT your code!

    fs.readFile(p, (err, fileContent) => {
      //if err, file doesn't exist and no cart
      //if no err; we have cart, cart = parse JSON content
      let cart = {productArray: [], totalPrice: 0}
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.productArray.findIndex(prod => prod.id === id);
      const existingProduct = cart.productArray[existingProductIndex]; //use to replace existing product in cart
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1; //increment qty by 1
        cart.productArray = [...cart.productArray];
        cart.productArray[existingProductIndex] = updatedProduct;
      }
      else { //if new product
        updatedProduct = { id: id, qty: 1};
        cart.productArray = [ ...cart.productArray, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + +productPrice; //+productPrice is now a number to avoid string concatination
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  };

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      };
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        prod => prod.id === id)
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });

    });
  };

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      }
      else {
        cb(cart);
      }
  });
};
};