'use strict';

angular.module('starter')

.controller('DescriptionCtrl', 
  ['$scope', '$state', '$http', '$stateParams', '$ionicModal', '$ionicBackdrop', '$timeout', 'User',
    function($scope, $state, $http, $stateParams, $ionicModal, $ionicBackdrop, $timeout, User) {
  
  $scope.coach_searchResult = {};
  $scope.coach_search = coach_search;
  $scope.coaches = [];
  $scope.join_center = join_center;

  $scope.showModal = showModal;
  $scope.closeModal = closeModal;
  
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
    center_name: $stateParams.center_name,
    center_id: $stateParams.center_id
  };

  // Display the modal for join to wod
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'fade-in',
    backdropClickToClose: false
  }).then(function(modal) {
    $scope.signupModal = modal;
  });

  function showModal(){
    $ionicBackdrop.retain();
    $scope.signupModal.show();
  };
  function closeModal(){
    $scope.signupModal.hide();
    $ionicBackdrop.release();
  };

  coach_search();
  join_center();
  
  // Render to profile page of Coach 
  $scope.coach_profile = function () {
    $state.go('coach_profile', {coach_id: $scope.coach_searchResult.id, coach_name: $scope.coach_searchResult.name, coach_duty: $scope.coach_searchResult.duty, wod_id: $scope.searchParams.wod_id, 
      center_id: $scope.searchParams.center_id, category_id: $scope.searchParams.category_id, category_name: $scope.searchParams.category_name})
  };

  // Search Coach Information for Wod
  function coach_search() {
    var url_params = 'center_id=' + $scope.searchParams.center_id;

    $http.get('http://localhost:3000/api/v1' + '/coaches/?' + url_params)
      .then(success, error);
    // success
    function success(resp) {
      console.log('Coach result: ', resp);
      $scope.coaches = resp.data.data;
      $scope.coach_searchResult = $scope.coaches[0];
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

  // Join the User for Wod
  function join_center() {
    var url_params = 'category_id=' + $scope.searchParams.category_id + '&user_id=' + $scope.searchParams.user_id + '&center_id=' + $scope.searchParams.center_id; 

    $http.put('http://localhost:3000/api/v1' + '/centers/:id?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Search result: ', resp);
      $scope.centers = resp.data.data;
      
      closeModal();
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };
  $scope.goMap = goMap;
  function goMap() {
    $state.go('map');
  }
  
}]);