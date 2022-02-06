const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path')

const p = path.join( //have a global so all functions have access
  rootDir,
  'data',
  'cart_data.json'
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
      console.log(cart,"cart, cart_model.js/26")
      // console.log(cart,"CART");
      // console.log(cart[0], "CART[0], cart_model.ejs/27")

      // console.log(cart.productArray, "PRODUCT.ARRAY");
      // console.log(productArray, "productArray, cart_model.ejs/30");
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
      // console.log(cart, "CART, cart_model.js/45")
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
      // console.log(updatedCart, "UPDATEDCART, cart_model.ejs/58");
      // console.log(updatedCart.productArray, "UPDATEDCART.PRODCUTARRAY, cart_model.js/59")
      const product = updatedCart.productArray.find(prod => prod.id === id);
      // console.log(product,'PRODUCT, cart_model.js/61')
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.productArray = updatedCart.productArray.filter(
        prod => prod.id !== id)
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });

    });
  };

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      // console.log(fileContent, "FILE CONTENT, cart_model/73");
      const cart = JSON.parse(fileContent);
      // console.log(cart, "CART, cart_model.js/75")
      if (err) {
        cb(null);
      }
      else {
        cb(cart);
      }
  });
};
};