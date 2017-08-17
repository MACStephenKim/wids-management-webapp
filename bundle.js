/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module('angularstatuses', ['ui.bootstrap']);

app.controller('statusesController', function ($scope, $http, $window) {
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

    $http.get('/checklogin').success(function (data) {
        if (data === true) {
            $scope.showadd = true;
            $scope.showdelete = true;
            $scope.logged = false;
            $scope.loggedout = true;
        } else {
            $scope.showadd = false;
            $scope.showdelete = false;
            $scope.logged = true;
            $scope.loggedout = false;
        }
    });

    //Get Statuses
    $http.get('/api/statuses').success(function (data) {
        $scope.statuses = data;
        $scope.totalItems = $scope.statuses.length;
        //Set item per page
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        };
    }).error(function (data) {
        console.log('Error: ' + data);
    });

    //Add Status
    $scope.createStatus = function () {
        $scope.showForm = false;
        $scope.showdelete = true;
        $scope.addForm.$setPristine();
        //Adjust to store the entered hours
        var hours = $scope.formData.inbound_timestamp.getHours() - 5;
        $scope.formData.inbound_timestamp = new Date($scope.formData.inbound_timestamp.setHours(hours));
        $http.post('/api/statuses', $scope.formData).success(function (data) {
            //Clear form fields
            $scope.formData = {};
            $scope.statuses = data;
            $scope.formData.inbound_timestamp = new Date();
            alert('STATUS HAS BEEN ADDED!');
            $scope.totalItems = $scope.statuses.length;
            //Set item per page
            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            };
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    //Cancel add status
    $scope.cancelStatus = function () {
        var cancelStatus = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if (cancelStatus) {
            //Clear form fields
            $scope.formData = {};
            $scope.formData.inbound_timestamp = new Date();
            $scope.addForm.$setPristine();
            $scope.showForm = false;
            $scope.showdelete = true;
        }
    };

    //Delete Status
    $scope.deleteStatus = function (item) {
        item.isChecked = true;
        deleteStatus = $window.confirm('ARE YOU SURE YOU WANT TO DELETE STATUS ID: ' + item.status_id + '?');
        if (deleteStatus) {
            $http.delete('/api/statuses/' + item.status_id).success(function (data) {
                $scope.statuses = data;
                $window.alert('STATUS ID: ' + item.status_id + " HAS BEEN DELETED!");
                $scope.totalItems = $scope.statuses.length;
                //Set item per page
                $scope.setItemsPerPage = function (num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first page
                };
            }).error(function (data) {
                console.log('Error: ' + data);
            });
        } else {
            item.isChecked = false;
        }
    };

    //Populate the form fields
    $scope.populateFields = function (item) {
        $scope.formupData = angular.copy(item);
        $scope.formupData.inbound_timestamp = new Date(item.inbound_timestamp);
        $scope.formupData.status = item.display_status;
        $scope.IsVisible = true;
        $scope.showadd = false;
        $scope.showForm = false;
        $scope.showdelete = false;
    };

    //Update status
    $scope.updateStatus = function (formupdata) {
        $scope.IsVisible = false;
        $scope.showadd = true;
        $scope.showdelete = true;
        //Adjust to store the entered hours
        var hours = $scope.formupData.inbound_timestamp.getHours() - 5;
        $scope.formupData.inbound_timestamp = new Date($scope.formupData.inbound_timestamp.setHours(hours));
        $http.put('/api/statuses/' + formupdata.status_id, $scope.formupData).success(function (data) {
            //Clear form fields
            $scope.formupData = {};
            $scope.statuses = data;
            alert('STATUS ID: ' + formupdata.status_id + " UPDATED");
            $scope.totalItems = $scope.statuses.length;
            //Set item per page
            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            };
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    //Cancel update status
    $scope.cancelupdateStatus = function () {
        var cancelStatus = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if (cancelStatus) {
            $scope.IsVisible = false;
            $scope.showadd = true;
            $scope.showdelete = true;
        }
    };

    //Clear the search
    $scope.searchClear = function () {
        $scope.searchKeyword = '';
    };
});

//Slice status
app.filter('startFrom', function () {
    return function (input, start) {
        if (input !== undefined) {
            start = +start; //parse to int
            return input.slice(start);
        }
    };
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module('angularactions', ['ui.bootstrap']);

app.controller('actionsController', function ($scope, $http, $window) {
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

    $http.get('/checklogin').success(function (data) {
        if (data === true) {
            $scope.showadd = true;
            $scope.showdelete = true;
            $scope.logged = false;
            $scope.loggedout = true;
        } else {
            $scope.showadd = false;
            $scope.showdelete = false;
            $scope.logged = true;
            $scope.loggedout = false;
        }
    });

    //Get actions
    $http.get('/api/actions').success(function (data) {
        $scope.actions = data;
        $scope.totalItems = $scope.actions.length;
        //Set items per page
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        };
    }).error(function (data) {
        console.log('Error: ' + data);
    });

    //Add action
    $scope.createAction = function () {
        $scope.showForm = false;
        $scope.showdelete = true;
        $scope.addForm.$setPristine();
        $http.post('/api/actions', $scope.formData).success(function (data) {
            //Clear form fields
            $scope.formData = {};
            $scope.actions = data;
            alert('ACTION HAS BEEN ADDED!');
            $scope.totalItems = $scope.actions.length;
            //Set items per page
            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            };
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    //Cancel add action
    $scope.cancelAction = function () {
        var cancelHeadcount = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if (cancelHeadcount) {
            //Clear form fields
            $scope.formData = {};
            $scope.addForm.$setPristine();
            $scope.showForm = false;
            $scope.showdelete = true;
        }
    };

    //Delete action
    $scope.deleteAction = function (item) {
        item.isChecked = true;
        deleteAction = $window.confirm('ARE YOU SURE YOU WANT TO DELETE ACTION ID: ' + item.action_id + '?');
        if (deleteAction) {
            $http.delete('/api/actions/' + item.action_id).success(function (data) {
                $scope.actions = data;
                $window.alert('ACTION ID: ' + item.action_id + " HAS BEEN DELETED!");
                $scope.totalItems = $scope.actions.length;
                //Set items per page
                $scope.setItemsPerPage = function (num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first page
                };
            }).error(function (data) {
                console.log('Error: ' + data);
            });
        } else {
            item.isChecked = false;
        }
    };

    //Populate the form fields
    $scope.populateFields = function (item) {
        $scope.formupData = angular.copy(item);
        $scope.IsVisible = true;
        $scope.showadd = false;
        $scope.showForm = false;
        $scope.showdelete = false;
    };

    //Update action
    $scope.updateAction = function (formupdata) {
        $scope.IsVisible = false;
        $scope.showadd = true;
        $scope.showdelete = true;
        $http.put('/api/actions/' + formupdata.action_id, $scope.formupData).success(function (data) {
            //Clear form fields
            $scope.formupData = {};
            $scope.actions = data;
            alert('ACTION ID: ' + formupdata.action_id + " UPDATED");
            $scope.totalItems = $scope.actions.length;
            //Set items per page
            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            };
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    //Cancel update action
    $scope.cancelupdateAction = function () {
        var cancelAction = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if (cancelAction) {
            $scope.IsVisible = false;
            $scope.showadd = true;
            $scope.showdelete = true;
        }
    };

    //Clear the search
    $scope.searchClear = function () {
        $scope.searchKeyword = '';
    };
});

//Slice action
app.filter('startFrom', function () {
    return function (input, start) {
        if (input !== undefined) {
            start = +start; //parse to int
            return input.slice(start);
        }
    };
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// angular.module('angularrestroom', ['mainController', 'restroomService']);
var app = angular.module('angularrestroom', ['ui.bootstrap']);

app.controller('restroomController', function ($scope, $http, $window) {
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

    $http.get('/checklogin').success(function (data) {
        if (data === true) {
            $scope.showadd = true;
            $scope.showdelete = true;
            $scope.logged = false;
            $scope.loggedout = true;
        } else {
            $scope.showadd = false;
            $scope.showdelete = false;
            $scope.logged = true;
            $scope.loggedout = false;
        }
    });

    //Get restrooms
    $http.get('/api/restrooms').success(function (data) {
        $scope.restrooms = data;
        storeRestroom = $scope.restrooms;
        $scope.totalItems = $scope.restrooms.length;
        //Set Items per page
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        };
    }).error(function (data) {
        console.log('Error: ' + data);
    });

    //Create Restroom
    $scope.createRestroom = function () {
        $scope.showForm = false;
        $scope.showdelete = true;
        $scope.addForm.$setPristine();
        $http.post('/api/restrooms', $scope.formData).success(function (data) {
            //Clear form fields
            $scope.formData = {};
            $scope.formData.terminal = "T1-Lindbergh";
            $scope.formData.arrow_direction = "left";
            $scope.restrooms = data;
            alert('RESTROOM HAS BEEN ADDED!');
            storeRestroom = $scope.restrooms;
            $scope.totalItems = $scope.restrooms.length;
            //Set Items per page
            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            };
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    //Cancel add restroom
    $scope.cancelRestroom = function () {
        var cancelRestroom = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if (cancelRestroom) {
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
    $scope.deleteRestroom = function (item) {
        item.isChecked = true;
        deleteRestroom = $window.confirm('ARE YOU SURE YOU WANT TO DELETE RESTROOM ID: ' + item.restroom_id + '?');
        if (deleteRestroom) {
            $http.delete('/api/restrooms/' + item.restroom_id).success(function (data) {
                $scope.restrooms = data;
                $window.alert('RESTROOM ID: ' + item.restroom_id + " HAS BEEN DELETED!");
                storeRestroom = $scope.restrooms;
                $scope.totalItems = $scope.restrooms.length;
                //Set Items per page
                $scope.setItemsPerPage = function (num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first page
                };
            }).error(function (data) {
                console.log('Error: ' + data);
            });
        } else {
            item.isChecked = false;
        }
    };

    //Populate the form fields
    $scope.populateFields = function (item) {
        $scope.formupData = angular.copy(item);
        $scope.IsVisible = true;
        $scope.showadd = false;
        $scope.showForm = false;
        $scope.showdelete = false;
    };

    //Update restroom
    $scope.updateRestroom = function (formupdata) {
        $scope.IsVisible = false;
        $scope.showadd = true;
        $scope.showdelete = true;
        $http.put('/api/restrooms/' + formupdata.restroom_id, $scope.formupData).success(function (data) {
            //Clear form fields
            $scope.formupData = {};
            $scope.restrooms = data;
            alert('RESTROOM ID: ' + formupdata.restroom_id + " UPDATED");
            storeRestroom = $scope.restrooms;
            $scope.totalItems = $scope.restrooms.length;
            //Set items per page
            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            };
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    //Cancel update restroom
    $scope.cancelupdateRestroom = function () {
        var cancelRestroom = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if (cancelRestroom) {
            $scope.IsVisible = false;
            $scope.showadd = true;
            $scope.showdelete = true;
            $scope.formData.terminal = "T1-Lindbergh";
            $scope.formData.arrow_direction = "left";
        }
    };

    //Clear the search
    $scope.searchClear = function () {
        $scope.searchKeyword = '';
    };
});

//Slice restroom
app.filter('startFrom', function () {
    return function (input, start) {
        if (input !== undefined) {
            start = +start; //parse to int
            return input.slice(start);
        }
    };
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module('angularindex', ['ui.bootstrap']);

app.controller('indexController', function ($scope, $http, $window) {
  $scope.logged = true;
  $scope.loggedout = false;

  // $scope.showadd = false;

  $http.get('/checklogin').success(function (data) {
    if (data === true) {
      $scope.logged = false;
      $scope.loggedout = true;
    } else {
      $scope.logged = true;
      $scope.loggedout = false;
    }
  });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module('angularheadcounts', ['ui.bootstrap']);

app.controller('headcountsController', function ($scope, $http, $window) {
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

    $http.get('/checklogin').success(function (data) {
        if (data === true) {
            $scope.showadd = true;
            $scope.showdelete = true;
            $scope.logged = false;
            $scope.loggedout = true;
        } else {
            $scope.showadd = false;
            $scope.showdelete = false;
            $scope.logged = true;
            $scope.loggedout = false;
        }
    });
    //Get headcounts
    $http.get('/api/headcounts').success(function (data) {
        $scope.headcounts = data;
        $scope.totalItems = $scope.headcounts.length;
        //Set item per page
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        };
    }).error(function (data) {
        console.log('Error: ' + data);
    });

    //Add Headcount
    $scope.createHeadcount = function () {
        $scope.showForm = false;
        $scope.showdelete = true;
        $scope.addForm.$setPristine();
        //Adjust to store the entered hours
        var hours = $scope.formData.timestamp.getHours() - 5;
        $scope.formData.timestamp = new Date($scope.formData.timestamp.setHours(hours));
        $http.post('/api/headcounts', $scope.formData).success(function (data) {
            //Clear form fields
            $scope.formData = {};
            $scope.headcounts = data;
            $scope.formData.timestamp = new Date();
            alert('HEADCOUNT HAS BEEN ADDED!');
            $scope.totalItems = $scope.headcounts.length;
            //Set items per page
            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            };
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    //Cancel add headcount
    $scope.cancelHeadcount = function () {
        var cancelHeadcount = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if (cancelHeadcount) {
            //Clear form fields
            $scope.formData = {};
            $scope.formData.timestamp = new Date();
            $scope.addForm.$setPristine();
            $scope.showForm = false;
            $scope.showdelete = true;
        }
    };

    //Delete headcount
    $scope.deleteHeadcount = function (item) {
        item.isChecked = true;
        deleteHeadcount = $window.confirm('ARE YOU SURE YOU WANT TO DELETE HEADCOUNT ID: ' + item.headcount_id + '?');
        if (deleteHeadcount) {
            $http.delete('/api/headcounts/' + item.headcount_id).success(function (data) {
                $scope.headcounts = data;
                $window.alert('HEADCOUNT ID: ' + item.headcount_id + " HAS BEEN DELETED!");
                $scope.totalItems = $scope.headcounts.length;
                //Set items per page
                $scope.setItemsPerPage = function (num) {
                    $scope.itemsPerPage = num;
                    $scope.currentPage = 1; //reset to first page
                };
            }).error(function (data) {
                console.log('Error: ' + data);
            });
        } else {
            item.isChecked = false;
        }
    };

    //Populate the form fields
    $scope.populateFields = function (item) {
        $scope.formupData = angular.copy(item);
        $scope.formupData.timestamp = new Date(item.timestamp);
        $scope.IsVisible = true;
        $scope.showadd = false;
        $scope.showForm = false;
        $scope.showdelete = false;
    };

    //Update headcount
    $scope.updateHeadcount = function (formupdata) {
        $scope.IsVisible = false;
        $scope.showadd = true;
        $scope.showdelete = true;
        //Adjust to store the entered hours
        var hours = $scope.formupData.timestamp.getHours() - 5;
        $scope.formupData.timestamp = new Date($scope.formupData.timestamp.setHours(hours));
        $http.put('/api/headcounts/' + formupdata.headcount_id, $scope.formupData).success(function (data) {
            //Clear form fields
            $scope.formupData = {};
            $scope.headcounts = data;
            alert('HEADCOUNT ID: ' + formupdata.headcount_id + " UPDATED");
            $scope.totalItems = $scope.headcounts.length;
            //Set items per page
            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            };
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    //Cancel update headcount
    $scope.cancelupdateHeadcount = function () {
        var cancelHeadcount = $window.confirm('ARE YOU SURE YOU WANT TO CANCEL?');
        if (cancelHeadcount) {
            $scope.IsVisible = false;
            $scope.showadd = true;
            $scope.showdelete = true;
        }
    };

    //Clear the search
    $scope.searchClear = function () {
        $scope.searchKeyword = '';
    };
});

//Slice headcount
app.filter('startFrom', function () {
    return function (input, start) {
        if (input !== undefined) {
            start = +start; //parse to int
            return input.slice(start);
        }
    };
});

/***/ })
/******/ ]);