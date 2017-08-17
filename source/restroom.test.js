/// <reference path="counter.js"/>
"use strict";
 
describe('restroomController', function() {
  beforeEach(module('angularrestroom'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    // // Set up the mock http service responses
    //  $httpBackend = $injector.get('$httpBackend');
    //  // backend definition common for all tests
    //  authRequestHandler = $httpBackend.when('POST', '/api/restrooms')
    //                         .respond({userId: 'userX'}, {'A-Token': 'xxx'});
  }));
  describe('$scope.createRestroom', function() {
    it('checks to see if add is not showing', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope });

        expect($scope.showadd).toBe(false);
    });

    it('checks to see if form is not showing', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope });

        expect($scope.showForm).toBe(false);
    });
    it('checks to see if delete is not showing', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope });
        expect($scope.showdelete).toEqual(false);
    });
    it('checks to see if $scope.terminal is T1-Lindbergh', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope }); 
        expect($scope.formData.terminal).toEqual('T1-Lindbergh');
    });
    it('checks to see if $scope.formData.arrow_direction is left', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope });
        expect($scope.formData.arrow_direction).toEqual('left');
    });
    it('checks to see if logged is true', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope });
        expect($scope.logged).toEqual(true);
    });
    it('checks to see if logged out is false', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope });
        expect($scope.loggedout).toEqual(false);
    });
    it('checks to see if orderbyfield is restroom_id', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope });
        expect($scope.orderByField).toEqual('restroom_id');
    });
    it('checks to see if currentpage is 1', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope });
        expect($scope.currentPage).toEqual(1);
    });
    it('checks to see if viewby is 10', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope });
        expect($scope.viewby).toEqual('10');
    });
     it('checks to see if reversort is false', function() {
        var $scope = {};
        var controller = $controller('restroomController', { $scope: $scope });
        expect($scope.reverseSort).toEqual(false);
    });
  });
});








// describe('restroomController', function() {
//   beforeEach(module('angularrestroom'));

//   var $controller;
//   var $httpBackend, $scope;
//   var scope;
//   beforeEach(inject(function(_$controller_, $rootScope, _$httpBackend_){
//     $httpBackend = _$httpBackend_;
//     scope = $rootScope.$new();
//     $httpBackend.whenGET('http://localhost:3000/checklogin').respond(200);
//     $controller = _$controller_;
//     var controller = $controller('restroomController', { $scope: scope });
//   }));
//   it('checks to see if add is not showing', function() {
//         $httpBackend.expectGET('http://localhost:3000/checklogin');
//         console.log(scope);
//         scope.getchecklogin();
//         $httpBackend.flush();
        
//         console.log($scope.showadd);
//         expect($scope.showadd).toBe(true);
//     });
// });
