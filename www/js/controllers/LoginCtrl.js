'use strict';

angular.module('starter')

.controller('LoginCtrl', ['$scope', '$state', '$http', '$auth', 'User',
    function($scope, $state, $http, $auth, User) {
  
  $scope.users = {};

  $scope.submitLogin = function () {

    $scope.submitted = true;
    
    $auth.submitLogin($scope.login)
      
      .then(function(resp) {
        
        User.setUser(resp);
        $scope.users = resp
        
        // if(form.$valid) {
          $state.go('tabs.explore', {user_id: $scope.users.id});
        // }
      })
      .catch(function(resp) {
        // handle error response
      });
  };
  $scope.hasError = function(field, validation){
    if(validation){
      return ($scope.loginForm[field].$dirty && $scope.loginForm[field].$error[validation]) || ($scope.submitted && $scope.loginForm[field].$error[validation]);
    }
    return ($scope.loginForm[field].$dirty && $scope.loginForm[field].$invalid) || ($scope.submitted && $scope.loginForm[field].$invalid);
  };

}]);