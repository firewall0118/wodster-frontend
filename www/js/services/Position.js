angular.module('starter')
.factory('Position', function () {
  'use strict';

  var data = {
    lat: 39.80261,
    lang: -104.96679
  };

  return {
    getPosition: function () {
      return data;
    },
    setPosition: function (lat, lang) {
      data.lat = lat;
      data.lang = lang;
    }
  };
});
