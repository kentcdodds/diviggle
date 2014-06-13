angular.module('dv.common.directives').directive('dvDynamicName', function() {
  'use strict';
  return {
    restrict: 'A',
    priority: 599, // one after ngIf
    controller: function($scope, $element, $attrs) {
      $element.removeAttr('dv-dynamic-name');
      $attrs.$set('name', $scope.$eval($attrs.dvDynamicName));
      delete $attrs.dvDynamicName;
    }
  };
});