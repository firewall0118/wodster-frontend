'use strict';

angular.module('starter')

.controller('CoachProfileCtrl', ['$scope', '$state', '$http', '$stateParams', 'ngProgressFactory',
  function($scope, $state, $http, $stateParams, ngProgressFactory) {
    
  $scope.cert_searchResult = {};
  $scope.certifications = [];
  $scope.certification_info_search = certification_info_search;
  $scope.userCoach = userCoach;

  $scope.searchParams = {
    user_id: $stateParams.user_id,
    coach_name: $stateParams.coach_name,
    coach_id: $stateParams.coach_id,
    coach_duty: $stateParams.coach_duty,
    wod_id: $stateParams.wod_id,
    center_id: $stateParams.center_id,
    category_id: $stateParams.category_id,
      category_name: $stateParams.category_name
    };

  // Progress  
  initProgress();

  function initProgress() {
    $scope.progressbar = ngProgressFactory.createInstance();    
    $scope.progressbar.setParent(document.getElementById('ngProgress-container'));
    $scope.progressbar.set(10);
  }   
  
  // Get all of the Certification Informatino by Coach ID
  certification_info_search();

  function certification_info_search() {
    
    var url_params = 'coach_id=' + $scope.searchParams.coach_id;

    $http.get('http://localhost:3000/api/v1' + '/certifications/?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Certi Search result: ', resp);
      $scope.certifications = resp.data.data;
      $scope.cert_searchResult = $scope.certifications[0];
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

  // Search Coach Data by Coach ID
  userCoach();
  
  function userCoach() {
    var url_params = 'coach_id=' + $scope.searchParams.coach_id;

    $http.get('http://localhost:3000/api/v1' + '/user_coaches?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Coach User Search result: ', resp);
      $scope.userCoaches = resp.data.data;
      
      for(var i = 0; i < $scope.userCoaches.length; i++ ){
        getCoachUser($scope.userCoaches[i].user_id );
      }
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

  // Get data of users that requested coach
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
  
  // Render to page to create wod
  $scope.goCreateWod = goCreateWod;
  function goCreateWod() {
    $state.go('goCreateWod', {center_id: $scope.searchParams.center_id, category_name: $scope.searchParams.category_name})
  }

}]);