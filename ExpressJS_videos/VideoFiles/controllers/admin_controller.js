const Product = require('../models/product_model');

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
  const product = new Product(null, title, imgURL,descript,price);
    product.save(); //uses save message from prodjct.js
    res.redirect('/');
  };



exports.getEditProduct = (req, res, next) => {
  console.log("HEY YOU GUYS")
  console.log(req.productId, "PRODUCT_ID")
  const editMode = req.query.edit; //req.query, the stuff after URL starting with a ?, can have & to have several queries like edit (Always a String, to "true" instead of true)
  console.log("EditMode",editMode)
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product', //Add-product no longer highlighed on nav
      editing: editMode, //flag variable?
      product: product
  })
  });
};


exports.postEditProduct = (req, res, next) => {
// fetch info for product
// create new product instance and populate it with info
// call save

  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgURL = req.body.imgURL;
  const updatedDescript = req.body.descript;
  const updatedProduct = new Product(
    prodId, 
    updatedTitle, 
    updatedImgURL, 
    updatedDescript,
    updatedPrice) //needs to match product_model.ejs 27-31
  updatedProduct.save();
  res.redirect('/admin/products_view')
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
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products_view');
};