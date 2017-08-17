var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');


const url = 'https://api-dev.mspmac.org/qa1.0/wids/headcounts';
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render("headcounts",{
    title: "AngularJS headcounts"
  })
});

router.get('/:id', function(req, res, next) {
  res.render("headcounts",{
    title: "AngularJS headcounts"
  })
});

router.post('/', function(req, res, next) {
  res.render("headcounts",{
    title: "AngularJS headcounts"
  })
});

router.delete('/:id', function(req, res, next) {
  res.render("headcounts",{
    title: "AngularJS headcounts"
  })
});

router.put('/:id', function(req, res, next) {
  res.render("headcounts",{
    title: "AngularJS headcounts"
  })
});


module.exports = router;