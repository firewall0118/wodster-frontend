'use strict';

angular.module('starter')

.controller('CategoryCtrl', ['$rootScope', '$scope', '$state', '$http', '$location', '$auth', '$stateParams', 'Subject', function($rootScope, $scope, $state, $http, $location, $auth, $stateParams, Subject) {
  
  $scope.searchResult = {};
  $scope.wods = [];
  // $scope.category_search = category_search;

  $scope.searchParams = {
    user_id: $stateParams.user_id
  };

  /**
   * @name: search
   * @params: none
   * @description: 
  **/
  $scope.search = function () {
    // if (!$scope.searchForm.$valid) {
    //   return;
    // }

  $state.go('search', {category_id: $scope.searchResult.id, category_name: $scope.searchResult.name})
  };

  $scope.category_search = function() {
    
    var url_params = 'user_id=' + $scope.searchParams.user_id; 

    $http.get('http://localhost:3000/api/v1' + '/categories/?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Search result: ', resp);
      $scope.categories = resp.data.data;
      $scope.searchResult = $scope.wods[0];
      // pagination();
    }

    // error
    function error(resp) {
      console.log(resp);
    }
  };
}]);