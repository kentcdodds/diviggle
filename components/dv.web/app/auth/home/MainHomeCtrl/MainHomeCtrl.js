angular.module('dv.web').controller('MainHomeCtrl', function ($scope, loggedInUsersRef, $firebase) {
  'use strict';
  $scope.greeting = 'Hello world!';
  $scope.loggedInUsers = $firebase(loggedInUsersRef);
});