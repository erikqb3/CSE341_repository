const path = require('path'); //module
const express = require('express');
const shopController = require('../controllers/shop_controller');

const router = express.Router();

router.get('/', shopController.getIndex); //productsController.getProducts is an argument function within the get function
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct_1); // : says that product can be anything //if you had another route with similar path, put it before the route with :
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart) //post route
router.post('/cart-delete-item', shopController.postCartDeleteProduct)
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);

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