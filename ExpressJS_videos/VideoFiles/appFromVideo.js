const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

const app = express();
app.set('view engine', 'ejs'); //says we should use 'pug' whenever we try to render a template 
app.set('views','views'); //view is default, but if not, make it so; we define all veiws to start in view folder

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
console.log(shopRoutes);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public'))); //pass in a path you want to serve staticlly, get reaccseess to
// express will take any request that tries to find some file and automatically forwards it to the public folder; in this case

app.use('/admin', adminData.routes); // filter; only sites with /admin will go down the admin route
app.use(shopRoutes);

app.use((req, res, next) => { 
  res.status(404).render('404', {pageTitle: 'Page Not Found'});
  // res.status(404).sendFile(path.join(rootDir,'views','404.html'))

})
app.listen(3000);




// //BETA 2
// // const http = require('http');

// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const rootDir = require('./util/path');

// const app = express();

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname,'public'))); //pass in a path you want to serve staticlly, get reaccseess to
// // express will take any request that tries to find some file and automatically forwards it to the public folder; in this case

// app.use('/admin', adminRoutes); // filter; only sites with /admin will go down the admin route
// app.use(shopRoutes);

// app.use((req, res, next) => { //a catch all middleware, you make a 404 error page, no '/' requried; defualt, app.use will handle both gets and posts
//   // res.status(666).send('<h1>A Wild Missingno appeared! Error code 404</h1>') //status tells if code works or not
//   res.status(404).sendFile(path.join(rootDir,'views','404.html'))
// })



// app.listen(3000);


// //BETA 1

// app.use('/', (req, res, next) => {
//   res.send('<h1>Hellow from Express</h1>') //better than res.write

// });



// app.use((req, res, next) => {
//   console.log("In the middleware!");
//   next(); //need next() in order to jumpt to next middleware (app.use)
// });
// app.use('/', (req, res, next) => {
//   console.log("this always runs");
//   next();
// })

// app.use(bodyParser.urlencoded({extended: false}));

// app.use('/add-product', (req, res, next) => { //"/add-product" comes befre '/' because we won't be calling next(), thus preventing the other middle ware from happening, this is kind of a weird,unspoken,based on logic and cascading code "if statement"
//   // console.log("In another middleware!");
//   // res.send('<h1>Add Product Page</h1>') //better than res.write
//   res. send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
//   // next();

// });

// app.post ('/product', (req,res,next) => { //app.get is basically the same for app.use, but only acts on get requests (same thing with app.post)
//   console.log(req.body);
//   res.redirect('/');
// })

// app.use('/', (req, res, next) => {
//   // console.log("In another middleware!");
//   res.send('<h1>Hellow from Express</h1>') //better than res.write

// });

// // const server = http.createServer(app);
// // server.listen(3000);

// app.listen(3000);