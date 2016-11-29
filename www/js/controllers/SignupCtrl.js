'use strict';

angular.module('starter')
.controller('SignupCtrl', ['$scope', '$http', '$state', '$auth', 
  function($scope, $http, $state, $auth) {

  $scope.submitRegistration = function () {
    
    $scope.submitted = true;

    $auth.submitRegistration($scope.registration)

      .then(function(resp) {
      	console.log('success:', resp )
        $state.go('login');
      })
      .catch(function(resp) {
        // handle error response
        console.log('error:', resp)
      });
  };

  $scope.hasError = function(field, validation){
    if(validation){
      return ($scope.registrationForm[field].$dirty && $scope.registrationForm[field].$error[validation]) || ($scope.submitted && $scope.registrationForm[field].$error[validation]);
    }
    return ($scope.registrationForm[field].$dirty && $scope.registrationForm[field].$invalid) || ($scope.submitted && $scope.registrationForm[field].$invalid);
  };
  
}]);
