angular.module('dv.common.filters').filter('dvDayOfWeek', function() {
  'use strict';
  var weekdays = [
    'Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  return function(input) {
    return weekdays[input];
  };
});