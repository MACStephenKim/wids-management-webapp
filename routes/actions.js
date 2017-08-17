var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');


const url = 'https://api-dev.mspmac.org/qa1.0/wids/actions';
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render("actions",{
    title: "AngularJS actions"
  })
});

router.get('/:id', function(req, res, next) {
  res.render("actions",{
    title: "AngularJS actions"
  })
});

router.post('/', function(req, res, next) {
  res.render("actions",{
    title: "AngularJS actions"
  })
});

router.delete('/:id', function(req, res, next) {
  res.render("actions",{
    title: "AngularJS actions"
  })
});

router.put('/:id', function(req, res, next) {
  res.render("actions",{
    title: "AngularJS actions"
  })
});


module.exports = router;