const express = require('express');
const path = require('path');
const bodyParser  = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.set('views','views');

app.get('/', (req, res, next) => {
  res.render('addUser', {pageTitle: "Add User"});
});

app.get('/userList', (req, res, next) => {
  res.render('userList', {pageTitle: "UserList"});
});

app.post('/addUser', (req, res, next) => {
  res.redirect('/userList');
})


app.listen(3000)