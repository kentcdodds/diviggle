angular.module('dv.web').directive('dvNavBar', function (FILE_ROOT) {
  'use strict';
  return {
    restrict: 'E',
    templateUrl: FILE_ROOT + 'components/dv.web/app/auth/home/dv-nav-bar.html',
    link: function (scope, el, attrs) {
      var body = angular.element(document.body);
      scope.toggleNavigation = function($event) {
        $event.stopPropagation();
        if (body.hasClass('menu')) {
          body.removeClass('menu');
          body.off('click', scope.toggleNavigation);
        } else {
          body.addClass('menu');
          body.on('click', scope.toggleNavigation);
        }
      };
    }
  };
});