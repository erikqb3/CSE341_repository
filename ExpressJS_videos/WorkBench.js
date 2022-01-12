// const http = require('http');

const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log("In the middleware!");
//   next(); //need next() in order to jumpt to next middleware (app.use)
// });
// app.use('/', (req, res, next) => {
//   console.log("this always runs");
//   next();
// })

app.use()

app.use(('/add-product', (req, res, next) => { //"/add-product" comes befre '/' because we won't be calling next(), thus preventing the other middle ware from happening, this is kind of a weird,unspoken,based on logic and cascading code "if statement"
  console.log("In another middleware!");
  // res.send('<h1>Add Product Page</h1>') //better than res.write
  res. send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
  // next();

}));

app.use('/product', (req,res,next) => {
  console.log(req.body);
  res.redirect('/');
})

app.use('/', (req, res, next) => {
  console.log("In another middleware!");
  res.send('<h1>Hellow from Express</h1>') //better than res.write

});

// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);