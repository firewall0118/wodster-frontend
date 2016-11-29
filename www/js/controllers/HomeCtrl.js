angular.module('starter.controllers', [])

.controller('HomeCtrl', ['$scope', '$auth', '$state', '$location', function($scope, $auth, $state, $location) {
	
  $scope.goSignup = function() {
    $location.path( '/signup' );
	};
	$scope.goLogin = function() {
    $location.path( '/login' );
	};

  $scope.authFacebook = function () {
    $auth.authenticate('facebook', {});
  };

  $scope.profile = function() {
    $state.go('profile')
  };
}]);