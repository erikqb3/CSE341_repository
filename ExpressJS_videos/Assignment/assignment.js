const express = require('express');

const app = express();

app.use((req, res, next) =>{
  console.log("This will always run, not sure if it runs twice and if it does, why?");
  console.log("oh good, it only runs once, with every time you refresh or change page")
  next();
})

app.use('/users',(req,res,next) => {
  res.write('<h1>Middleware 2</h1>\
  <h2>Also so far so good</h2>\
  <p>It says "users", not "loosers"'); //NOTE, cant have res.write and res.send
  next();
})
app.use('/users', (req,res,next) => {
  res.write('<h1>Yeah, this is middleware is supposed to be added onto Middleware2');
  res.end();
})

app.use('/',(req,res,next) =>{ //The string before the (req...) acts as a filter
  res.send('<h1>Middleware 1</h1>\
  <h2>So far so good</h2>\
  <p>Just adding some more stuff after adding nodemon</p>\
  <p>I guess I am doing something wrong or something</p>\
  <p>Okay, so I got to add it to my json package. Make it so instead of node [filename], be nodmone[file name]\
  <p>Please work this time now</p>\
  <h4>Cool! Works now! Just needs to refresh and changes are made! Hazah!');
})

app.listen(3000);
// console.log(app);