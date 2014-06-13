angular.module('dv.web').controller('LoginCtrl', function($scope, $state, LoginState) {
  'use strict';
  $scope.login = LoginState.login;
});