(function(){
  'use strict';

  angular
    .module('starter')
    .factory('Subject', SubjectService);

  SubjectService.$inject = ['$rootScope', '$http', 'config'];

  function SubjectService($rootScope, $http, config) {
    var service = {};

    // service.getSubjects = getSubjects;

    $rootScope.getSubjects = function(params) {
    
      var url_params = 'name=' + params.name;
      return $http.get('http://localhost:3000/api/v1' + '/wods/?' + url_params).then(function(response) {
        return response.data;
      });
    }

    return service;
  }

})();