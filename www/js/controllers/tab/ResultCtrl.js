  'use strict';

angular.module('starter')

.controller('ResultCtrl', ['$scope', '$state', '$http', '$stateParams', 
  function($scope, $state, $http, $stateParams) {
    
  $scope.searchResult = {};
  $scope.centers = [];
  $scope.allCenter = allCenter;

  $scope.searchParams = {
    user_id: $stateParams.user_id,
    category_id: $stateParams.category_id,
    category_name: $stateParams.category_name,
    wod_id: $stateParams.wod_id,
    name: $stateParams.name,
    wod_datetime: $stateParams.wod_datetime,
    wod_time: $stateParams.wod_time,
    location: $stateParams.location,
    capacity: $stateParams.capacity,
    description: $stateParams.description,
    center_id: $stateParams.center_id
  };

  allCenter();

  // Render to Description page
  $scope.description = function (center) {
    $state.go('description', {wod_id: $scope.searchParams.wod_id, name: $scope.searchParams.name, wod_datetime: $scope.searchParams.wod_datetime, location: $scope.searchParams.location, capacity: $scope.searchParams.capacity, 
      description: $scope.searchParams.description, center_name: center.name, center_id: center.id, category_id: $scope.searchParams.category_id, category_name: $scope.searchParams.category_name, user_id: $scope.searchParams.user_id})    
  };

  // Get all of the Center information by Center_id within Wod
  function allCenter() {
    var url_params = 'category_id=' + $scope.searchParams.category_id + '&center_id=' + $scope.searchParams.center_id;

    $http.get('http://localhost:3000/api/v1' + '/centers/?' + url_params)
      .then(success, error);
    // success
    function success(resp) {
      console.log('Search result: ', resp);
      $scope.centers = resp.data.data;
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

}]);