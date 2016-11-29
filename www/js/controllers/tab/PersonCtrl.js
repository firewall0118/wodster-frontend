'use strict';

angular.module('starter')

.controller('PersonCtrl', 
	['$scope', '$state', '$http', '$auth', 'User', '$ionicModal', '$ionicBackdrop',
		function($scope, $state, $http, $auth, User, $ionicModal, $ionicBackdrop) {
  
  $scope.signOut = function() {
    $auth.signOut()
      .then(function(resp) {
        $state.go('home');
        $scope.authenticated = false;
      })
      .catch(function(resp) {
      });
  };

  $scope.coach_search = coach_search;
  $scope.requestCoach = requestCoach;

  $scope.showModal = showModal;
  $scope.closeModal = closeModal;

  // Display the modal for request the coach
  $ionicModal.fromTemplateUrl('templates/coach-modal.html', {
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
  
  // Get Current User logged in
  $scope.user = User.getUser();
  if(!$scope.user)
  	return ;
  		
  userCenter();
  
  $scope.userCenter = userCenter;
  $scope.coachProfile = coachProfile;

  // Get information of wods that User joined
  function userCenter() {
    
    var url_params = 'user_id=' + $scope.user.id;

    $http.get('http://localhost:3000/api/v1' + '/user_centers?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Search result: ', resp);
      $scope.userCenters = resp.data.data;
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };
  
  coach_search(userCenter)

  // Get the Coach Information for wod
  function coach_search(userCenter) {
    var url_params = 'center_id=' + userCenter.id;

    $http.get('http://localhost:3000/api/v1' + '/coaches/?' + url_params)
      .then(success, error);
    // success
    function success(resp) {
      console.log('Coach result: ', resp);
      $scope.coaches = resp.data.data;
      $scope.resultCoaches = $scope.coaches[0]
      User.setUserCoachSearch($scope.resultCoaches)
      showModal();
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

  // Request the Coach for wod
  function requestCoach() {
    var url_params = '&user_id=' + $scope.user.id + '&coach_id=' + $scope.resultCoaches.id; 

    $http.put('http://localhost:3000/api/v1' + '/coaches/update?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Search result: ', resp);
      $scope.userCoaches = resp.data.data;
      
      closeModal();
      $state.go('userCoachProfile');

    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

  function coachProfile() {
  	$state.go('userCoachProfile');
  }

}]);