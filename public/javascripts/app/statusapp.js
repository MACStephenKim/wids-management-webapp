require('./style.css');
var app = angular.module('angularstatuses',['ui.bootstrap']);
app.controller('statusesController', function($scope, $http, $window) {
    $scope.formData = {};
    $scope.IsVisible = false;
    $scope.showForm = false;
    $scope.showadd = true;
    $scope.showdelete = true;
    var deleteStatus = false;

    $scope.currentPage = 1;
    $scope.viewby = '10';
    $scope.itemsPerPage = $scope.viewby;
    $scope.orderByField = 'status_id';
    $scope.reverseSort = false;
    $scope.formData.inbound_timestamp = new Date();
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

    //Get Statuses
    $http.get('/api/statuses')    
        .success(function(data) {
            $scope.statuses = data;
            $scope.totalItems = $scope.statuses.length;
            //Set item per page
            $scope.setItemsPerPage = function(num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            }
        })
        .error(function(data){
            console.log('Error: ' + data);
        });

    //Add Status
    $scope.createStatus = function(){
        $scope.showForm = false;
        $scope.showdelete = true;
        $scope.addForm.$setPristine();
        //Adjust to store the entered hours
        var hours = $scope.formData.inbound_timestamp.getHours()-5;
        $scope.formData.inbound_timestamp = new Date($scope.formData.inbound_timestamp.setHours(hours));
        $http.post('/api/statuses', $scope.formData)    
            .success(function(data) {
                //Clear form fields
                $scope.formData = {};
                $scope.statuses = data;
                $scope.formData.inbound_timestamp = new Date();
                alert('STATUS HAS BEEN ADDED!');
                $scope.totalItems = $scope.statuses.length;         
                //Set item per page
                $scope.setItemsPerPage = function(num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first page
                }
            })
            .error(function(data){
            console.log('Error: ' + data);
        });
    };

    //Cancel add status
    $scope.cancelStatus = function(){
        var cancelStatus = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if(cancelStatus){
             //Clear form fields
             $scope.formData = {};
             $scope.formData.inbound_timestamp = new Date();
             $scope.addForm.$setPristine();
             $scope.showForm = false;
             $scope.showdelete = true;
        }
    };

    //Delete Status
    $scope.deleteStatus = function(item){
        item.isChecked = true;
        deleteStatus = $window.confirm('ARE YOU SURE YOU WANT TO DELETE STATUS ID: ' +item.status_id+'?');
        if (deleteStatus) {
            $http.delete('/api/statuses/'+ item.status_id)
                .success(function(data){
                    $scope.statuses = data;
                    $window.alert('STATUS ID: '+item.status_id+" HAS BEEN DELETED!");
                    $scope.totalItems = $scope.statuses.length;
                    //Set item per page
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
        $scope.formupData.inbound_timestamp = new Date(item.inbound_timestamp);
        $scope.formupData.status = item.display_status;
        $scope.IsVisible = true;
        $scope.showadd = false;
        $scope.showForm = false;
        $scope.showdelete = false;
    };

    //Update status
    $scope.updateStatus = function(formupdata){
        $scope.IsVisible = false;
        $scope.showadd = true;
        $scope.showdelete = true;
        //Adjust to store the entered hours
        var hours = $scope.formupData.inbound_timestamp.getHours()-5;
        $scope.formupData.inbound_timestamp = new Date($scope.formupData.inbound_timestamp.setHours(hours));
        $http.put('/api/statuses/'+ formupdata.status_id, $scope.formupData)
            .success(function(data){
                //Clear form fields
                $scope.formupData = {};
                $scope.statuses = data;
                alert('STATUS ID: '+ formupdata.status_id+" UPDATED");
                $scope.totalItems = $scope.statuses.length;
                //Set item per page
                $scope.setItemsPerPage = function(num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first page
                }
            })
            .error(function(data){
                console.log('Error: '+data);
            });
    };

    //Cancel update status
    $scope.cancelupdateStatus = function(){
        var cancelStatus = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if(cancelStatus){
             $scope.IsVisible = false;
             $scope.showadd = true;
             $scope.showdelete = true;
        }
    };

    //Clear the search
    $scope.searchClear = function(){
        $scope.searchKeyword = '';
    };

});

//Slice status
app.filter('startFrom', function() {
    return function(input, start) {
        if(input !== undefined){
            start = +start; //parse to int
            return input.slice(start);
        }
    }
});