angular.module('starter')
.directive('file', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        if(file.size>0){
          scope.file = file;
          scope.$parent.file = file;
        } else {
          scope.file = {};
          scope.$parent.file = {}; 
        }
        scope.$apply();
      });
    }
  };
})