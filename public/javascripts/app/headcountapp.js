var app = angular.module('angularheadcounts',['ui.bootstrap']);

app.controller('headcountsController', function($scope, $http, $window) {
    $scope.formData = {};
    $scope.IsVisible = false;
    $scope.showForm = false;
    $scope.showadd = true;
    $scope.showdelete = true;
    var deleteHeadcount = false;

    $scope.currentPage = 1;
    $scope.viewby = '10';
    $scope.itemsPerPage = $scope.viewby;
    $scope.orderByField = 'headcount_id';
    $scope.reverseSort = false;
    $scope.formData.timestamp = new Date();
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
    //Get headcounts
    $http.get('/api/headcounts')    
        .success(function(data) {
            $scope.headcounts = data;
            $scope.totalItems = $scope.headcounts.length;
            //Set item per page
            $scope.setItemsPerPage = function(num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            }
        })
        .error(function(data){
            console.log('Error: ' + data);
        });

    //Add Headcount
    $scope.createHeadcount = function(){
        $scope.showForm = false;
        $scope.showdelete = true;
        $scope.addForm.$setPristine();
        //Adjust to store the entered hours
        var hours = $scope.formData.timestamp.getHours()-5;
        $scope.formData.timestamp = new Date($scope.formData.timestamp.setHours(hours));
        $http.post('/api/headcounts', $scope.formData)    
            .success(function(data) {
                //Clear form fields
                $scope.formData = {};
                $scope.headcounts = data;
                $scope.formData.timestamp = new Date();
                alert('HEADCOUNT HAS BEEN ADDED!');
                $scope.totalItems = $scope.headcounts.length;         
                //Set items per page
                $scope.setItemsPerPage = function(num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first page
                }
            })
            .error(function(data){
            console.log('Error: ' + data);
        });
    };

    //Cancel add headcount
    $scope.cancelHeadcount = function(){
        var cancelHeadcount = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if(cancelHeadcount){
             //Clear form fields
             $scope.formData = {};
             $scope.formData.timestamp = new Date();
             $scope.addForm.$setPristine();
             $scope.showForm = false;
             $scope.showdelete = true;
        }
    };

    //Delete headcount
    $scope.deleteHeadcount = function(item){
        item.isChecked = true;
        deleteHeadcount = $window.confirm('ARE YOU SURE YOU WANT TO DELETE HEADCOUNT ID: ' +item.headcount_id+'?');
        if (deleteHeadcount) {
            $http.delete('/api/headcounts/'+ item.headcount_id)
                .success(function(data){
                    $scope.headcounts = data;
                    $window.alert('HEADCOUNT ID: '+item.headcount_id+" HAS BEEN DELETED!");
                    $scope.totalItems = $scope.headcounts.length;
                    //Set items per page
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
        $scope.formupData.timestamp = new Date(item.timestamp);
        $scope.IsVisible = true;
        $scope.showadd = false;
        $scope.showForm = false;
        $scope.showdelete = false;
    };

    //Update headcount
    $scope.updateHeadcount = function(formupdata){
        $scope.IsVisible = false;
        $scope.showadd = true;
        $scope.showdelete = true;
        //Adjust to store the entered hours
        var hours = $scope.formupData.timestamp.getHours()-5;
        $scope.formupData.timestamp = new Date($scope.formupData.timestamp.setHours(hours));
        $http.put('/api/headcounts/'+ formupdata.headcount_id, $scope.formupData)
            .success(function(data){
                //Clear form fields
                $scope.formupData = {};
                $scope.headcounts = data;
                alert('HEADCOUNT ID: '+ formupdata.headcount_id+" UPDATED");
                $scope.totalItems = $scope.headcounts.length;
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

    //Cancel update headcount
    $scope.cancelupdateHeadcount = function(){
        var cancelHeadcount = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if(cancelHeadcount){
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

//Slice headcount
app.filter('startFrom', function() {
    return function(input, start) {
        if(input !== undefined){
            start = +start; //parse to int
            return input.slice(start);
        }
    }
});