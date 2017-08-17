var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');


const url = 'https://api-dev.mspmac.org/qa1.0/wids/restrooms';
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render("restroomto",{
    title: "AngularJS Restrooms"
  })
});

router.get('/:id', function(req, res, next) {
  res.render("restroomto",{
    title: "AngularJS Restrooms"
  })
});

router.post('/', function(req, res, next) {
  res.render("restroomto",{
    title: "AngularJS Restrooms"
  })
});

router.delete('/:id', function(req, res, next) {
  res.render("restroomto",{
    title: "AngularJS Restrooms"
  })
});

router.put('/:id', function(req, res, next) {
  res.render("restroomto",{
    title: "AngularJS Restrooms"
  })
});



module.exports = router;
