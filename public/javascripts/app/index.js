var app = angular.module('angularindex',['ui.bootstrap']);

app.controller('indexController', function($scope, $http, $window) {
    $scope.logged = true;
    $scope.loggedout = false;

    // $scope.showadd = false;

      $http.get('/checklogin')
        .success(function(data) {
          if (data === true){
            $scope.logged = false;
            $scope.loggedout = true;
          }
          else{
            $scope.logged = true;
            $scope.loggedout = false;
          }
        });
});