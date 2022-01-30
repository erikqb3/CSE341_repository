const mongodb = require('mongodb');
const Product = require('../models/product_model');

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product', //just to highlight certain navigation item
      editing: false
    });
  }


exports.postAddProduct = (req,res,next) => { //app.get is basically the same for app.use, but only acts on get requests (same thing with app.post)
  const title = req.body.title;  
  const imgURL = req.body.imgURL;
  const price = req.body.price;
  const descript = req.body.descript;
  const product = new Product(null, title, imgURL, price, descript);
  // const product = new Product(
  //   title, 
  //   price, 
  //   descript, 
  //   imgURL,
  //   null,
  //   req.user._id
  //   );
  console.log(product, "PRODUCT, admin_controller/29");
  // product.save();
  // res.redirect('/');
  product
    .save()
    // .then(result => {
    //   // console.log('Created Product, admin_controller/23');
    //   res.redirect('/admin/products');
    // })
    // .catch(err => {
    //   console.log(err);
    //   res.redirect('/');
    // });//uses save message from prodjct.js
    res.redirect('/');
  };



exports.getEditProduct = (req, res, next) => {
  // console.log("HEY YOU GUYS")
  // console.log(req.productId, "REQ.PRODUCTID, admin_controller, 36")
  const editMode = req.query.edit; //req.query, the stuff after URL starting with a ?, can have & to have several queries like edit (Always a String, to "true" instead of true)
  // console.log("EditMode",editMode)
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.product._id;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      };
        res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product', //Add-product no longer highlighed on nav
          editing: editMode, //flag variable?
          product: product
      });
    })
    .catch(err => console.log(err));
  // Product.findById(prodId, product => {
  //   }
  // });
};


exports.postEditProduct = (req, res, next) => {
// fetch info for product
// create new product instance and populate it with info
// call save

  const prodId = req.body._productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgURL = req.body.imgURL;
  const updatedDescript = req.body.descript;
  const updatedProduct = new Product(
    updatedTitle, 
    updatedPrice,
    updatedDescript,
    updatedImgURL, 
    new ObjectId(prodId)) //needs to match product_model.ejs 27-31
  updatedProduct.save()
    .then(result => {
      res.redirect('/admin/products_view')
    })
    .catch(err => console.log(err));
}


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
      res.render('admin/products_view', {
        prods: products,
        pageTitle: "Admin Products",
        path:"/admin/products_view"
      });
    });
  };


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.product._id;
  console.log(req.body, "REQ.BODY, admin_controller.js/92")
  Product.deleteById(prodId);
  res.redirect('/admin/products_view');
};