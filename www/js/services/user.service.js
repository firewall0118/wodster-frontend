angular.module('starter')
.service('User', function () {
  'use strict';

  var user = null;
  var center = null;
  var coach = null;

  function getUser() {
    return user;
  };

  function setUser(data) {
    user = data;
  };

  function getUserCoachSearch() {
    return coach;
  };

  function setUserCoachSearch(data) {
    coach = data
  }
  return {
    getUser: getUser,
    setUser: setUser,

    getUserCoachSearch: getUserCoachSearch,
    setUserCoachSearch: setUserCoachSearch,
  };
  
});
