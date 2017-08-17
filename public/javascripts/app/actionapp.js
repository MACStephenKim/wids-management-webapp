var app = angular.module('angularactions',['ui.bootstrap']);

app.controller('actionsController', function($scope, $http, $window) {
    $scope.formData = {};
    $scope.IsVisible = false;
    $scope.showForm = false;
    $scope.showadd = true;
    $scope.showdelete = true;
    var deleteAction = false;

    $scope.currentPage = 1;
    $scope.viewby = '10';
    $scope.itemsPerPage = $scope.viewby;
    $scope.orderByField = 'action_id';
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

    //Get actions
    $http.get('/api/actions')    
        .success(function(data) {
            $scope.actions = data;
            $scope.totalItems = $scope.actions.length;
            //Set items per page
            $scope.setItemsPerPage = function(num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            }
        })
        .error(function(data){
            console.log('Error: ' + data);
        });

    //Add action
    $scope.createAction = function(){
        $scope.showForm = false;
        $scope.showdelete = true;
        $scope.addForm.$setPristine();
        $http.post('/api/actions', $scope.formData)    
            .success(function(data) {
                //Clear form fields
                $scope.formData = {};
                $scope.actions = data;
                alert('ACTION HAS BEEN ADDED!');
                $scope.totalItems = $scope.actions.length;         
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

    //Cancel add action
    $scope.cancelAction = function(){
        var cancelHeadcount = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if(cancelHeadcount){
             //Clear form fields
             $scope.formData = {};
             $scope.addForm.$setPristine();
             $scope.showForm = false;
             $scope.showdelete = true;
        }
    };

    //Delete action
    $scope.deleteAction = function(item){
        item.isChecked = true;
        deleteAction = $window.confirm('ARE YOU SURE YOU WANT TO DELETE ACTION ID: ' +item.action_id+'?');
        if (deleteAction) {
            $http.delete('/api/actions/'+ item.action_id)
                .success(function(data){
                    $scope.actions = data;
                    $window.alert('ACTION ID: '+item.action_id+" HAS BEEN DELETED!");
                    $scope.totalItems = $scope.actions.length;
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
        $scope.IsVisible = true;
        $scope.showadd = false;
        $scope.showForm = false;
        $scope.showdelete = false;
    };

    //Update action
    $scope.updateAction = function(formupdata){
        $scope.IsVisible = false;
        $scope.showadd = true;
        $scope.showdelete = true;
        $http.put('/api/actions/'+ formupdata.action_id, $scope.formupData)
            .success(function(data){
                //Clear form fields
                $scope.formupData = {};
                $scope.actions = data;
                alert('ACTION ID: '+ formupdata.action_id+" UPDATED");
                $scope.totalItems = $scope.actions.length;
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

    //Cancel update action
    $scope.cancelupdateAction = function(){
        var cancelAction = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if(cancelAction){
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

//Slice action
app.filter('startFrom', function() {
    return function(input, start) {
        if(input !== undefined){
            start = +start; //parse to int
            return input.slice(start);
        }
    }
});