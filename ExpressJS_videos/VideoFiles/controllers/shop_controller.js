
const Product = require('../models/product_model');
const Cart = require('../models/cart_model');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: "All Products",
      path: '/products',
    });
  });
};

exports.getProduct_1 = (req, res, next) => {
  const prodId = req.params.productId; //productId works as a params because it is after : in router
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
    product: product,//left product is what we are retrieving, product on left is key
    pageTitle:  product.title,
    path: '/products'}); //if you get "path is not defined error" check this kind of stuff
  })
};



exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: "Shop",
      path: '/',
    });
  });
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      let counter = -1;
      for (product of products) {
        counter++;
        // console.log(product, "PRODUCT, shop_controller.js/45");
        // console.log(products, "PRODUCTS, shop_controller/46")
        // console.log(cart, "CART, shop_controller.js/47");
        // console.log(cart.productArray, "CART.PRODUCTARRAY, shop_controller.js/48");
        // console.log(cart.productArray.id, "CART.PRODUCTARRAY.ID, shop_controller.js/49");
        // console.log(products, "PRODCUTS, shop_controller.js/50")
        // console.log(counter, "COUNTER, shop_controller.js/67")
        // console.log(product, "PRODCUT, shop_controller.js/68")
        // console.log(cart.productArray[counter].qty, "CART.PRODUCTARRAY[0].qty, shop_controller.js/69");
        const cartProductData = products.find(prod => prod.id === product.id); //prod = product looking at in cart, product.id = 
        // console.log(cartProductData, "CARTPRODCUTDATA, shop_controller/50")
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cart.productArray[counter].qty});
          // console.log(cartProducts,"CARTPRODUCTS, shop_controllers/55")
          // console.log(cart.productArray.qty, "CART.PRODUCTARRAY.QTY, shop_controller/54")
        };
      };
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart', 
        products: cartProducts //productArray?
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; //productId = name in the input
  Product.findById(prodId,(product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
  
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}

























// // const products = [];

// const Product = require('../models/product');

// exports.getAddProduct = (req, res, next) => {
//     res.render('admin/add-product', {
//       pageTitle: 'Add Product',
//       path: '/admin/add-product',
//       // fromsCSS: true,
//       // productCSS: true,
//       // activeAddProduct: true
//     });
//   }


// exports.postAddProduct = (req,res,next) => { //app.get is basically the same for app.use, but only acts on get requests (same thing with app.post)
//     // products.push({title: req.body.title})
    
//     const product = new Product(req.body.title);
//     product.save(); //uses save message from prodjct.js
//     res.redirect('/');
//   };

  

// exports.getProducts = (req, res, next) => {
//   // const products = adminData.products;
//   Product.fetchAll((products) => {
//       // const products = Product.fetchAll();
//   // Product.fetchAll(products => {
//     res.render('shop/product-list', {
//       prods: products,
//       pageTitle: "Shop",
//       path: '/',
//       // hasProducts: products.length > 0,
//       // activeShop: true,
//       // productsCss: true
//     });
//   });
//   // });
//   // }
// };







// // const products = [];
// const Product = require('../models/product')

// exports.getAddProduct = (req, res, next) => {
//   res.render('add-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     fromsCSS: true,
//     productCSS: true,
//     activeAddProduct: true
//   });
// }

// exports.postAddProduct = (req,res,next) => { //app.get is basically the same for app.use, but only acts on get requests (same thing with app.post)
//   // products.push({title: req.body.title})
  
//   const product = new Product(req.body.title);
//   product.save(); //uses save message from prodjct.js
//   res.redirect('/');
// }


// exports.getProducts = (req, res, next) => {
//   // Product.fetchAll((products) => {
//       // const products = Product.fetchAll();
//   // Product.fetchAll(products => {
//     res.render('shop', {
//       prods: products,
//       pageTitle: "Shop",
//       path: '/',
//       hasProducts: products.length > 0,
//       activeShop: true,
//       productsCss: true
//     });
//   // });
//   // });
// };







// const Product = require('../models/product')

// exports.getAddProduct = (req, res, next) => {
//   res.render('add-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     fromsCSS: true,
//     productCSS: true,
//     activeAddProduct: true
//   });
// }

// exports.postAddProduct = (req,res,next) => { //app.get is basically the same for app.use, but only acts on get requests (same thing with app.post)
//   const product = new Product(req.body.title);
//   product.save();
//   res.redirect('/');
// }

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render('shop', {
//       prods: products,
//       pageTitle: "Shop",
//       path: '/',
//       hasProducts: products.length > 0,
//       activeShop: true,
//       productsCss: true
//     });
//   });
// }