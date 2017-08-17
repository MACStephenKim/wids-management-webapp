// var request = require("request");

// describe('restroomController', function() {
//   beforeEach(module('angularrestroom'));

//   var $controller;

//   beforeEach(inject(function(_$controller_){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $controller = _$controller_;
//   }));

//   describe('$scope.createRestroom', function() {
//     it('checks to see if restroom was created', function() {
//       var $scope = {};
//       var controller = $controller('restroomController', { $scope: $scope });
//       $scope.createRestroom();
//       expect($scope.formData.arrow_direction).toEqual('left');
//     });
//   });
// });

var request = require("request");
var app = require("../app.js");


var base_url = "http://localhost:3000/";

describe("Restroom Test", function(){
    describe("GET /checklogin", function() {
        it("returns home screen", function(done) {
            request.get(base_url+"checklogin", function(error, response, body) {
                expect(body).toBe(undefined);
                done();
            });
        });
    });
});




describe('restroomController', function() {
  beforeEach(module('angularrestroom'));

  var $controller;
  
  beforeEach(inject(function(_$controller_, _$httpBackend_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
        $scope = {};
        controller = $controller('restroomController', { $scope: $scope });

        $httpBackend = _$httpBackend_;

  }));

  describe('$scope.createRestroom', function() {
    it('checks to see if restroom was created', function() {
        $httpBackend.flush();

        console.log($scope.showadd);

        expect($scope.showadd).toBe(false);
    });

  });
});

