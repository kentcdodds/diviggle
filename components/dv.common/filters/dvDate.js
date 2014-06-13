angular.module('dv.common.filters').filter('dvDate', function($filter) {
  'use strict';
  /* jshint quotmark: false */
  return function dvDate(date, filter) {
    return $filter('date')(date, filter || "MMM d, yyyy',' h:mm a");
  };
});