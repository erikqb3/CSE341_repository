const path = require('path'); //module
const express = require('express');
// const rootDir = require('../util/path');
// const adminData = require ('./admin');

const productsController = require('../controllers/products');
const router = express.Router();


router.get('/', productsController.getProducts); //productsController.getProducts is an argument function within the get function

module.exports = router;



// router.get('/', (req, res, next) => {
//     // res.sendFile(path.join(rootDir, 'views', 'shop.html')); 
//   res.render('shop');
//   // const products = adminData.products;
//   // res.render('shop', {prods: products, docTitle: "Shop"}); 
// });

// module.exports = router;



// //BETA
// const path = require('path'); //module
// const express = require('express');
// const rootDir = require('../util/path');
// const adminData = require ('./admin');

// const router = express.Router();


// router.get('/', (req, res, next) => {
//   // res.send('<h1>Hellow from Express</h1>') //better than res.write
//   res.sendFile(path.join(rootDir, 'views', 'shop.html')); //create a path with module by calling join method which yields a path via concatitating different segments
//   // path.join() figures out your opperating system and concatanates to suit it 
//   // __dirname points to routes folder

// });

// module.exports = router;