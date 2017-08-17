// angular.module('angularrestroom', ['mainController', 'restroomService']);
var app = angular.module('angularrestroom',['ui.bootstrap']);

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

    // $scope.showadd = false;

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

    //Get restrooms
    $http.get('/api/restrooms')    
        .success(function(data) {
            $scope.restrooms = data;
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
    
    //Create Restroom
    $scope.createRestroom = function(){
        $scope.showForm = false;
        $scope.showdelete = true;
        $scope.addForm.$setPristine();
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

    //Cancel add restroom
    $scope.cancelRestroom = function(){
        var cancelRestroom = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if(cancelRestroom){
             //Clear form fields
             $scope.formData = {};
             $scope.addForm.$setPristine();
             $scope.formData.terminal = "T1-Lindbergh";
             $scope.formData.arrow_direction = "left";
             $scope.showForm = false;
             $scope.showdelete = true;
        }
    };

    //Delete Restroom
    $scope.deleteRestroom = function(item){
        item.isChecked = true;
        deleteRestroom = $window.confirm('ARE YOU SURE YOU WANT TO DELETE RESTROOM ID: ' +item.restroom_id+'?');
        if (deleteRestroom) {
            $http.delete('/api/restrooms/'+ item.restroom_id)
                .success(function(data){
                    $scope.restrooms = data;
                    $window.alert('RESTROOM ID: '+item.restroom_id+" HAS BEEN DELETED!");
                    storeRestroom = $scope.restrooms;
                    $scope.totalItems = $scope.restrooms.length;
                    //Set Items per page
                    $scope.setItemsPerPage = function(num) {
                        $scope.itemsPerPage = num;
                        $scope.currentPage = 1; //reset to first page
                    }
                })
                .error(function(data){
                    console.log('Error: '+data);
                });
        }
        else{
            item.isChecked = false;
        }
    };

    //Populate the form fields
    $scope.populateFields = function(item){
            $scope.formupData=angular.copy(item);
            $scope.IsVisible = true;
            $scope.showadd = false;
            $scope.showForm = false;
            $scope.showdelete = false;
    };

    //Update restroom
    $scope.updateRestroom = function(formupdata){
        $scope.IsVisible = false;
        $scope.showadd = true;
        $scope.showdelete = true;
        $http.put('/api/restrooms/'+ formupdata.restroom_id, $scope.formupData)
            .success(function(data){
                //Clear form fields
                $scope.formupData = {};
                $scope.restrooms = data;
                alert('RESTROOM ID: '+ formupdata.restroom_id+" UPDATED");
                storeRestroom = $scope.restrooms;
                $scope.totalItems = $scope.restrooms.length;
                //Set items per page
                $scope.setItemsPerPage = function(num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first page
                }
            })
            .error(function(data){
                console.log('Error: '+data);
            });
    };

    //Cancel update restroom
    $scope.cancelupdateRestroom = function(){
        var cancelRestroom = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if(cancelRestroom){
             $scope.IsVisible = false;
             $scope.showadd = true;
             $scope.showdelete = true;
             $scope.formData.terminal = "T1-Lindbergh";
             $scope.formData.arrow_direction = "left";
        }
    };

    //Clear the search
    $scope.searchClear = function(){
        $scope.searchKeyword = '';
    };
});

//Slice restroom
app.filter('startFrom', function() {
    return function(input, start) {
        if(input !== undefined){
            start = +start; //parse to int
            return input.slice(start);
        }
    }
});

