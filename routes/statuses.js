var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');


const url = 'https://api-dev.mspmac.org/qa1.0/wids/statuses';
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render("statuses",{
    title: "AngularJS Statuses"
  })
});

router.get('/:id', function(req, res, next) {
  res.render("statuses",{
    title: "AngularJS statuses"
  })
});

router.post('/', function(req, res, next) {
  res.render("statuses",{
    title: "AngularJS statuses"
  })
});

router.delete('/:id', function(req, res, next) {
  res.render("statuses",{
    title: "AngularJS statuses"
  })
});

router.put('/:id', function(req, res, next) {
  res.render("statuses",{
    title: "AngularJS statuses"
  })
});


module.exports = router;