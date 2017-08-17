// 'use strict';

var express = require('express');
// var passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/', function(req, res, next) {
//   passport.authenticate('ldapauth', {session: false}, function(err, user, info) {
//     if (err) {
//       return next(err); // will generate a 500 error
//     }
//     // Generate a JSON response reflecting authentication status
//     if (! user) {
//       return res.send({ success : false, message : 'authentication failed' });
//     }
//     return res.send({ success : true, message : 'authentication succeeded' });
//   })(req, res, next);
// });
module.exports = router;
