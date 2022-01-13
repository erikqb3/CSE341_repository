const path = require('path'); //order doesn't matter when setting up modules
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router(); //?

router.get('/goodRoute', (req,res,next) => {
  res.sendFile(path.join(rootDir,'views','goodRoute.html')); //sendFile?
});

router.post ('/goodRoute',(req,res,next) => { //Purpose?
  res.redirect('/')
})

module.exports = router //?