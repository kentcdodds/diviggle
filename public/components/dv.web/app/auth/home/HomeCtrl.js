angular.module('dv.web').controller('HomeCtrl', function ($scope) {
  'use strict';
  $scope.sectionName = 'Home';
  $scope.$on('$stateChangeSuccess', function(event, toState) {
    $scope.sectionName = toState.data ? toState.data.name || '' : '';
  });
});