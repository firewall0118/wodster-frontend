'use strict';

angular.module('starter')

.controller('SearchCtrl', ['$scope', '$state', '$http', '$stateParams',   
  function($scope, $state, $http, $stateParams) {

  $scope.searchParams = {
    user_id: $stateParams.user_id,
    category_id: $stateParams.category_id,
    category_name: $stateParams.category_name

  };
  $scope.searchNameParams = {};
  $scope.searchResult = {};

  // Request Event
  $scope.request = function () {
    $state.go('result', {wod_id: $scope.searchResult.id, name: $scope.searchResult.name, wod_datetime: $scope.searchResult.wod_datetime, 
             location: $scope.searchResult.location, description: $scope.searchResult.description, center_id: $scope.searchResult.center_id, capacity: $scope.searchResult.capacity, category_id: $scope.searchParams.category_id, category_name: $scope.searchParams.category_name, user_id: $scope.searchParams.user_id})
  };

  // Get all Center Information by Category Id
  allCenter();

  $scope.allCenter = allCenter;

  function allCenter() {
    var url_params = 'category_id=' + $scope.searchParams.category_id;
    
    $http.get('http://localhost:3000/api/v1' + '/centers/?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Center Search result: ', resp);
      $scope.centers = resp.data.data;
      $scope.center_searchResult = $scope.centers[0];
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  }

  // Search Wod Information by center ID and Wod Name
  $scope.wodSearch = wodSearch;
  function wodSearch() {
    
    var url_params = 'center_id=' + $scope.center_searchResult.id + '&wod_name=' + $scope.searchNameParams.name; 

    $http.get('http://localhost:3000/api/v1' + '/wods/?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Wod Search result: ', resp);
      $scope.wods = resp.data.data;
      $scope.searchResult = $scope.wods[0];
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };
}]);