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
  // console.log(product, "PRODUCT, admin_controller/29");
  // product.save();
  // res.redirect('/');
  product
    .save();
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
    // console.log("EDITMODE = FALSE, admin_controller/53")
    return res.redirect('/');
  }
  // console.log(req.params, "REQ.PRAMS,admin_controller/56")
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      console.log(product, "PRODUCT, admin_controllers.js/60")
      return res.redirect('/');
    };
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product', //Add-product no longer highlighed on nav
        editing: editMode, //flag variable?
        product: product
    });
  });
    // .then(product => {
    // })
    // .catch(err => console.log(err));
  // Product.findById(prodId, product => {
  //   }
  // });
};


exports.postEditProduct = (req, res, next) => {
// fetch info for product
// create new product instance and populate it with info
// call save

  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImgURL = req.body.imgURL;
  const updatedPrice = req.body.price;
  const updatedDescript = req.body.descript;
  const updatedProduct = new Product(
    prodId,
    updatedTitle, 
    updatedImgURL, 
    updatedPrice,
    updatedDescript)
    // new ObjectId(prodId)); //needs to match product_model.ejs 27-31
    // console.log(updatedProduct, "UPDATEDPROJECT, admin_controller.js/96");
  updatedProduct.save();
    // .then(result => {
    //   res.redirect('/admin/products_view')
    // })
    // .catch(err => console.log(err));
    res.redirect("/admin/products_view")
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
  const prodId = req.body.product.id;
  console.log(req.body, "REQ.BODY, admin_controller.js/92")
  Product.deleteById(prodId);
  res.redirect('/admin/products_view');
};