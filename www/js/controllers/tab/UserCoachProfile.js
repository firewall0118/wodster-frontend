'use strict';

angular.module('starter')

.controller('UserCoachProfileCtrl', 
	['$scope', '$state', '$http', '$auth', 'User', '$ionicModal',
		function($scope, $state, $http, $auth, User, $ionicModal) {
  
  // Get Current User logged in
  $scope.user = User.getUser();
  
  // Get the Coaches
  $scope.resultCoaches = User.getUserCoachSearch();
  $scope.certification_info_search = certification_info_search;
  $scope.userCoach = userCoach;
  $scope.getCoachUser = getCoachUser;

  userCoach();
  certification_info_search();

  // Get the Certification Information by Coach ID
  function certification_info_search() {
    
    var url_params = 'coach_id=' + $scope.resultCoaches.id;

    $http.get('http://localhost:3000/api/v1' + '/certifications/?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Certi Search result: ', resp);
      $scope.certifications = resp.data.data;
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

  // Get all of the User Id Within given Coach ID
  function userCoach() {
    var url_params = 'coach_id=' + $scope.resultCoaches.id;

    $http.get('http://localhost:3000/api/v1' + '/user_coaches?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Coach User Search result: ', resp);
      $scope.userCoaches = resp.data.data;
      $scope.selectUserCoach = $scope.userCoaches[0];
      for(var i = 0; i < $scope.userCoaches.length; i++ ){
        getCoachUser($scope.userCoaches[i].user_id );
      }
      getAllCenter($scope.selectUserCoach);
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

  // Get all users by User ID within Coach
  function getCoachUser(user_param) {

    var url_params = 'user_id=' + user_param;

    $http.get('http://localhost:3000/api/v1' + '/users?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('User result: ', resp);
      $scope.users = resp.data.data;
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

  //Get all Center by Coach Id
  $scope.getAllCenter = getAllCenter;
  
  function getAllCenter(center_params) {

    var url_params = 'center_id=' + center_params.center_id;

    $http.get('http://localhost:3000/api/v1' + '/all_centers?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('All Center result: ', resp);
      $scope.allCenters = resp.data.data;
      $scope.selectCenter = $scope.allCenters[0]
      getAllCategory($scope.selectCenter);
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

  //Get all the wod by center
  // $scope.getAllWod = getAllWod;
  // function getAllWod(wod_params) {

  //   var url_params = 'wod_id=' + wod_params.wod_id;

  //   $http.get('http://localhost:3000/api/v1' + '/all_wods?' + url_params)
  //     .then(success, error);

  //   // success
  //   function success(resp) {
  //     console.log('All Wod result: ', resp);
  //     $scope.allWods = resp.data.data;
  //     $scope.selectWod = $scope.allWods[0];
  //     getAllCategory($scope.selectWod);
  //   }
  //   // error
  //   function error(resp) {
  //     console.log(resp);
  //   }
  // };

  //Get all the Category by Wod
  $scope.getAllCategory = getAllCategory;
  function getAllCategory(category_params) {

    var url_params = 'category_id=' + category_params.category_id;

    $http.get('http://localhost:3000/api/v1' + '/all_categories?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('All Wod result: ', resp);
      $scope.allCategories = resp.data.data;
      $scope.selectCategory = $scope.allCategories[0];
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };
  
  // Go to page for create the Wod
  $scope.goCreateWod = goCreateWod;
  function goCreateWod() {
    $state.go('goCreateWod', {category_name: $scope.selectCategory.name, center_id: $scope.selectUserCoach.id})
  }
}]);