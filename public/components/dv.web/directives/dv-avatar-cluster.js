angular.module('dv.web.directives').directive('dvAvatarCluster', function(_) {
  /* jshint -W015 */
  'use strict';
  return {
    template: function() {
      return [
        '<div class="dv-avatar-cluster-container">',
          '<span dv-avatar="user" class="avatar-wrapper small" ng-repeat="user in ::visibleUsers" size="small"></span>',
          '<span ng-if="::hiddenUsers.length" class="plus-avatars cursor-pointer" ',
                'popover="Coming soon..." popover-title="{{::users.length}} People" popover-trigger="mouseenter">',
            '+ {{::hiddenUsers.length}}',
          '</span>',
        '</div>'
      ].join('');
    },
    scope: {
      users: '=dvAvatarCluster'
    },
    link: function(scope, el, attrs) {
      scope.users = scope.users || [];

      var limit = ~~attrs.limit || 5;
      // prevent adding a +1
      if (scope.users.length - limit === 1) {
        limit++;
      }
      scope.visibleUsers = _.first(scope.users, limit);
      scope.hiddenUsers = _.difference(scope.users, scope.visibleUsers);
    }
  };
});