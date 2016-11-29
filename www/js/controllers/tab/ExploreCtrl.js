'use strict';

angular.module('starter')

.controller('ExploreCtrl', ['$rootScope', '$scope', '$state', '$http', '$location', '$auth', '$stateParams', 'Subject', function($rootScope, $scope, $state, $http, $location, 	$auth, $stateParams) {
  
  $scope.signOut = function() {
    $auth.signOut()
      .then(function(resp) {
        $state.go('home');
        $scope.authenticated = false;
      })
      .catch(function(resp) {
      });
  };

  $scope.categories = [];
  $scope.category_search = category_search;
  $scope.go_search = go_search;

  $scope.searchParams = {
    user_id: $stateParams.user_id
  }

  // Render to Search Page
  category_search();

  function go_search(category){
    $state.go('search', {category_id: category.id, category_name: category.name, user_id: $scope.searchParams.user_id})
  }

  // Get All of Category Information
  function category_search() {

    $http.get('http://localhost:3000/api/v1' + '/categories/')
      .then(success, error);
    // success
    function success(resp) {
      console.log('Search result: ', resp);
      $scope.categories.data = resp.data.data;
      $scope.categories = $scope.categories.data;
      return $scope.categories;
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  }; 

}]);