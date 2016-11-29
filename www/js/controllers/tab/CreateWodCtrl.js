'use strict';

angular.module('starter')

.controller('CreateWodCtrl', ['$scope', 'Upload', '$state', '$http', '$auth', '$stateParams', function($scope, Upload, $state, $http, $auth, $stateParams) {

  $scope.searchParams = {
    category_name: $stateParams.category_name,
    center_id: $stateParams.center_id
  };

  $scope.searchResult = {};
  $scope.createWod = createWod;
  $scope.current_date;

  // Create Wod
  function createWod() {
    var url_params = 'center_id=' + $scope.searchParams.center_id + '&wod_name=' + $scope.searchResult.name + '&location=' + $scope.searchResult.location + 
      '&description=' + $scope.searchResult.description + 
      '&date=' + $scope.searchResult.currentDate + 
      '&time=' + $scope.searchResult.currentTime +  
      '&capacity=' + $scope.searchResult.capacity +
      '&img_name=' + $scope.uploadResult.name + 
      '&img_type=' + $scope.uploadResult.type + 
      '&img_size=' + $scope.uploadResult.size;

    $http.post('http://localhost:3000/api/v1' + '/wods/?' + url_params)
      .then(success, error);

    // success
    function success(resp) {
      console.log('Create result: ', resp);
      $scope.wods = resp.data.data;
    }
    // error
    function error(resp) {
      console.log(resp);
    }
  };

  // file upload
  $scope.upload = {};
  $scope.uploadResult = {};
  $scope.fileUpload = fileUpload;

  function fileUpload() {
    if ($scope.createWodForm.file.$valid && $scope.upload.file) {
      console.log('upload result: ', $scope.upload.file);
      $scope.uploadResult = $scope.upload.file;
    }
  }

  // Get the Current Date 
  // $scope.searchResult.currentTime = new Date();

}]);