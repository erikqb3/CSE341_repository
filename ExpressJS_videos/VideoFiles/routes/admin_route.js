
const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin_controller');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct); //getAddProduct is a function we are simply referencing, it's an argument function, a method
// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);
// /admin/products => GET
router.get('/products_view', adminController.getProducts);

router.get('/edit-product/:product._id', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;





// // const path = require('path');
// const express = require('express');
// const productsController = require('../controllers/products');

// const router = express.Router();



// router.get('/add-product', productsController.getAddProduct); //getAddProduct is a function we are simply referencing, it's an argument function, a method
// // });

// // the post route is triggered when form is submmitted
// router.post('/add-product', productsController.postAddProduct);

// module.exports = router;




// BETA 
// const path = require('path');
// const express = require('express');
// const rootDir = require('../util/path');

// const router = express.Router();

// const products = [];

// // router.get('/add-product', (req, res, next) => { //"/add-product" comes befre '/' because we won't be calling next(), thus preventing the other middle ware from happening, this is kind of a weird,unspoken,based on logic and cascading code "if statement"
//   // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
// router.get('/add-product', (req, res, next) => {
//   res.render('add-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     fromsCSS: true,
//     productCSS: true,
//     activeAddProduct: true
//   });
// });
// // });

// // the post route is triggered when form is submmitted
// router.post('/add-product', (req,res,next) => { //app.get is basically the same for app.use, but only acts on get requests (same thing with app.post)
//   products.push({title: req.body.title});
//   res.redirect('/');
// })

// exports.routes = router;
// exports.products = products;

// // BETA
// const path = require('path');

// const express = require('express');

// const rootDir = require('../util/path');

// const router = express.Router();

// // /admin/ad-product => GET
// router.get('/add-product', (req, res, next) => { //"/add-product" comes befre '/' because we won't be calling next(), thus preventing the other middle ware from happening, this is kind of a weird,unspoken,based on logic and cascading code "if statement"
//   // console.log("In another middleware!");
//   // res.send('<h1>Add Product Page</h1>') //better than res.write
//   // res. send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
//   // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')); //__dirname is one way, the next line is another but needs rootDir and other files
//   res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
//   // next();

// });

// // /admin/ad-product => POST
// router.post ('/add-product', (req,res,next) => { //app.get is basically the same for app.use, but only acts on get requests (same thing with app.post)
//   console.log(req.body);
//   res.redirect('/');
// })

// module.exports = router;