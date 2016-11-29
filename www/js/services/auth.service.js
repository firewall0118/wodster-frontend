
(function(){
  'use strict';

  angular
    .module('starter')
    .factory('Auth', AuthService);

  AuthService.$inject = ['$rootScope', '$http', 'config', 'localStorageService'];

  function AuthService($rootScope, $http, config, localStorageService) {
    var service = {};

    service.setCredentials = setCredentials;
    service.clearCredentials = clearCredentials;

    /**
     * @name setCredentials
     * @params
     * @desc set credentails to local storage
     */
    function setCredentials(user) {
      $rootScope.globals = {
        currentUser: user
      };

      $rootScope.authenticated = true;
      localStorageService.set('globals', $rootScope.globals);
    }

    /**
     * @name clearCredentials
     * @desc clear credentilas from local storage
     */
    function clearCredentials() {
      $rootScope.globals = {};
      $rootScope.authenticated = false;
      localStorageService.remove('globals');
    }

    return service;
  }

})();