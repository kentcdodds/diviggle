angular.module('dv.common.directives').directive('dvSelectAllOnFocus', function() {
  'use strict';
  return {
    link: function(scope, el, attrs) {
      el.on('focus', function() {
        $(el).select();
      });
    }
  };
});