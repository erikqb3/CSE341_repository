const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    fromsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
}

exports.postAddProducts = (req,res,next) => { //app.get is basically the same for app.use, but only acts on get requests (same thing with app.post)
  products.push({title: req.body.title});
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  // const products = adminData.products; //products is in this file, thus no extraction needed
  res.render('shop', {
    prods: products,
    pageTitle: "Shop",
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productsCss: true
  });
}