angular.module('dv.common.filters').filter('dvPhone', function() {
  'use strict';

  return function dvPhone(string) {
    /* jshint maxcomplexity: 9 */
    string = string || '';
    if (string.length > 9) {
      return string.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }

    var totalString = '';
    if (string.length > 0) {
      totalString = '(' + string.substr(0, 3);
    }

    if (string.length > 2) {
      totalString += ') ';
    }

    if (string.length > 3) {
      totalString += string.substr(3, 3);
    }

    if (string.length > 5) {
      totalString += '-';
    }

    if (string.length > 6) {
      totalString += string.substr(6, 4);
    }

    return totalString;
  };
});