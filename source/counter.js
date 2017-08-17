// "use strict";
 
// var counter = (function () {
 
//     var add = function(num1, num2) {
//         return num1 + num2;
//     };
 
//     var subtract = function(num1, num2) {
//         return num1 - num2;
//     };
 
//     return {
//         add: add,
//         subtract: subtract
//     };
 
// }());
// angular.module('angularrestroom', ['mainController', 'restroomService']);
var app = angular.module('angularrestroom',[]);

app.controller('restroomController', function($scope, $http, $window) {
    $scope.formData = {};
    $scope.formData.terminal = "T1-Lindbergh";
    $scope.formData.arrow_direction = "left";
    $scope.IsVisible = false;
    $scope.showForm = false;
    $scope.showadd = true;
    $scope.showdelete = true;
    var deleteRestroom = false;
    var storeRestroom;
    $scope.currentPage = 1;
    $scope.viewby = '10';
    $scope.itemsPerPage = $scope.viewby;
    $scope.direction = ["left", "right"];
    $scope.orderByField = 'restroom_id';
    $scope.reverseSort = false;
    $scope.showadd = false;
    $scope.showdelete = false;
    $scope.logged = true;
    $scope.loggedout = false;


    $scope.getchecklogin = function()
    {
        $http.get('/checklogin')
            .success(function(data) {
            if (data === true){
                $scope.showadd = true;
                $scope.showdelete = true;
                $scope.logged = false;
                $scope.loggedout = true;
            }
            else{
                $scope.showadd = false;
                $scope.showdelete = false;
                $scope.logged = true;
                $scope.loggedout = false;
            }
        });
    }

    //Create Restroom
    $scope.createRestroom = function(){
        $scope.showForm = false;
        $scope.showdelete = true;
        $http.post('/api/restrooms', $scope.formData)    
            .success(function(data) {
                //Clear form fields
                $scope.formData = {};
                $scope.formData.terminal = "T1-Lindbergh";
                $scope.formData.arrow_direction = "left";
                $scope.restrooms = data;
                alert('RESTROOM HAS BEEN ADDED!');
                storeRestroom = $scope.restrooms;
                $scope.totalItems = $scope.restrooms.length;         
                //Set Items per page
                $scope.setItemsPerPage = function(num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first page
                }
            })
            .error(function(data){
            console.log('Error: ' + data);
        });
    };
});



    