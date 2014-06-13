angular.module('dv.web.directives').directive('dvAvatar', function() {
  /* jshint -W015 */
  'use strict';
  return {
    template: function(el, attrs) {
      return [
        '<span class="dv-avatar-container">',
          '<img ng-src="{{::user.profilePhoto}}" class="' + (attrs.size || 'normal') + ' img-circle">',
        '</span>'
      ].join('');
    },
    scope: {
      user: '=dvAvatar'
    }
  };
});