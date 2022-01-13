console.log("Hellow");

const express = require('express');
const bodyParser = require('body-parser'); //?
const path = require('path');
const rootDir = require('./util/path'); //do I really want to put in the effort to make this?

const app = express(); //?
const goodRoute = require('./routes/goodRoute');
const badRoute = require('./routes/badRoute');

app.use(bodyParser.urlencoded({extended: false})); //?
app.use(express.static(path.join(__dirname,'public')));

app.use('/awesome', goodRoute);
app.use(badRoute);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views','404.html')); //error code 
});

app.listen(4000);