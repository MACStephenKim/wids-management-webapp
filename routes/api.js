var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');

var env = process.env['NODE_ENV'] || 'dev';

// var url = 'https://api-' + env.trim() + '.mspmac.org/qa1.0/wids/';
var url = 'https://api-' + 'dev' + '.mspmac.org/qa1.0/wids/';

console.log(url);
// Get all restrooms default limit 80
router.get('/restrooms', function(req, res, next) {
  request(url+"restrooms?$top=140", function (error, response, body) {
    res.json(JSON.parse(body));
  });
});
// Get restroom by id 
router.get('/restrooms/:id', function(req, res, next) {
  request(url+"restrooms/" + req.params.id, function (error, response, body) {
    res.json(JSON.parse(body));
  });
});
// Post restroom
router.post('/restrooms', function(req, res, next) {
    var reqOptions = {
        url: url+ "restrooms",
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: [req.body]
    }


  request(reqOptions, function (error, response, body) {
    if(!error){
        request(url+"restrooms?$top=140", function (error, response, body) {
          res.json(JSON.parse(body));
        });
    }
    else{
        res.send("Error");
    }
  });
});

//Delete restroom
router.delete('/restrooms/:id', function(req, res, next){
    var restrooms_id = req.params.id;
      request(
        {
          url: url+"restrooms/"+restrooms_id,
          method: "DELETE",
      }, function(error, response, body){
          if(!error){
            request(url+"restrooms?$top=140", function (error, response, body) {
              res.json(JSON.parse(body));
            });
          } else{
            res.send("Error");
          }
      });
});

//Update restroom
router.put('/restrooms/:id', function(req, res, next){
    var restrooms_id = req.params.id;
    request(
      {
        url: url+"restrooms/"+restrooms_id,
        method: "PUT",
        json: true,
        body: req.body
    }, function(error, response, body){
        if(!error){
          request(url+"restrooms?$top=140", function (error, response, body) {
              res.json(JSON.parse(body));
            });
        } else{
          // console.log("Error");
          res.send("Error");
        }
    });
});

//Get Statuses
router.get('/statuses', function(req, res, next) {
  request(url+"statuses?$top=500", function (error, response, body) {
    res.json(JSON.parse(body));
  });
});

// Get status by id 
router.get('/statuses/:id', function(req, res, next) {
  request(url+"statuses/" + req.params.id, function (error, response, body) {
    res.json(JSON.parse(body));
  });
});
// Post status
router.post('/statuses', function(req, res, next) {
    var reqOptions = {
        url: url+ "statuses",
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: [req.body]
    }


  request(reqOptions, function (error, response, body) {
    if(!error){
        request(url+"statuses?$top=500", function (error, response, body) {
          res.json(JSON.parse(body));
        });
    }
    else{
        res.send("Error");
    }
  });
});

//Delete Status
router.delete('/statuses/:id', function(req, res, next){
    var statuses_id = req.params.id;
      request(
        {
          url: url+"statuses/"+statuses_id,
          method: "DELETE",
      }, function(error, response, body){
          if(!error){
            request(url+"statuses?$top=500", function (error, response, body) {
              res.json(JSON.parse(body));
            });
          } else{
            res.send("Error");
          }
      });
});

//Update Status
router.put('/statuses/:id', function(req, res, next){
    var statuses_id = req.params.id;
    request(
      {
        url: url+"statuses/"+statuses_id,
        method: "PUT",
        json: true,
        body: req.body
    }, function(error, response, body){
        if(!error){
          request(url+"statuses?$top=500", function (error, response, body) {
              res.json(JSON.parse(body));
            });
        } else{
          // console.log("Error");
          res.send("Error");
        }
    });
});

//Get Headcounts
router.get('/headcounts', function(req, res, next) {
  request(url+"headcounts?$top=40", function (error, response, body) {
    res.json(JSON.parse(body));
  });
});

// Get headcounts by id 
router.get('/headcounts/:id', function(req, res, next) {
  request(url+"headcounts/" + req.params.id, function (error, response, body) {
    res.json(JSON.parse(body));
  });
});

// Post status
router.post('/headcounts', function(req, res, next) {
    var reqOptions = {
        url: url+ "headcounts",
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: [req.body]
    }


  request(reqOptions, function (error, response, body) {
    if(!error){
        request(url+"headcounts?$top=40", function (error, response, body) {
          res.json(JSON.parse(body));
        });
    }
    else{
        res.send("Error");
    }
  });
});

//Delete Status
router.delete('/headcounts/:id', function(req, res, next){
    var headcount_id = req.params.id;
      request(
        {
          url: url+"headcounts/"+headcount_id,
          method: "DELETE",
      }, function(error, response, body){
          if(!error){
            request(url+"headcounts?$top=40", function (error, response, body) {
              res.json(JSON.parse(body));
            });
          } else{
            res.send("Error");
          }
      });
});

//Update Status
router.put('/headcounts/:id', function(req, res, next){
    var headcount_id = req.params.id;
    request(
      {
        url: url+"headcounts/"+headcount_id,
        method: "PUT",
        json: true,
        body: req.body
    }, function(error, response, body){
        if(!error){
          request(url+"headcounts?$top=40", function (error, response, body) {
              res.json(JSON.parse(body));
            });
        } else{
          // console.log("Error");
          res.send("Error");
        }
    });
});

//Get Actions
router.get('/actions', function(req, res, next) {
  request(url+"actions?$top=40", function (error, response, body) {
    res.json(JSON.parse(body));
  });
});

// Get actions by id 
router.get('/actions/:id', function(req, res, next) {
  request(url+"actions/" + req.params.id, function (error, response, body) {
    res.json(JSON.parse(body));
  });
});

// Post action
router.post('/actions', function(req, res, next) {
    var reqOptions = {
        url: url+ "actions",
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: [req.body]
    }


  request(reqOptions, function (error, response, body) {
    if(!error){
        request(url+"actions?$top=40", function (error, response, body) {
          res.json(JSON.parse(body));
        });
    }
    else{
        res.send("Error");
    }
  });
});

//Delete Action
router.delete('/actions/:id', function(req, res, next){
    var action_id = req.params.id;
      request(
        {
          url: url+"actions/"+action_id,
          method: "DELETE"
      }, function(error, response, body){
          if(!error){
            request(url+"actions?$top=40", function (error, response, body) {
              res.json(JSON.parse(body));
            });
          } else{
            res.send("Error");
          }
      });
});

//Update Action
router.put('/actions/:id', function(req, res, next){
    var action_id = req.params.id;
    request(
      {
        url: url+"actions/"+action_id,
        method: "PUT",
        json: true,
        body: req.body
    }, function(error, response, body){
        if(!error){
          request(url+"actions?$top=40", function (error, response, body) {
              res.json(JSON.parse(body));
            });
        } else{
          // console.log("Error");
          res.send("Error");
        }
    });
});


module.exports = router;