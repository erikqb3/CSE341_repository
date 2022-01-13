const path = require('path'); //order doesn't matter when setting up modules
const express = require('express');
const rootDir = require('../util/path');


const router = express.Router(); //?

router.get('/', (req,res,next) => {
  res.sendFile(path.join(rootDir, 'views','badRoute.html')); //sendFile?
});

// router.post ('/badRoute',(req,res,next) => { //Purpose?
//   res.redirect('/')
// })
// different than Good Route, this is default

module.exports = router //?