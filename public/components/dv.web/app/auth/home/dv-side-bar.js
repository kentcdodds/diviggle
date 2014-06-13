angular.module('dv.web').directive('dvSideBar', function(FILE_ROOT) {
  'use strict';
  var homePrefix = 'root.auth.home.';
  var menuOptions = [
    {
      name: 'Home',
      sref: homePrefix + 'main',
      icon: 'inbox'
    },
    {
      name: 'Keys',
      sref: homePrefix + 'keys.list',
      icon: 'key'
    },
    {
      name: 'Locks',
      sref: homePrefix + 'locks.list',
      icon: 'lock'
    },
    {
      name: 'Companies',
      sref: homePrefix + 'companies.list',
      icon: 'building'
    },
    {
      name: 'Profile',
      sref: homePrefix + 'profile',
      icon: 'user',
      narrowOnly: true
    },
    {
      name: 'Log out',
      sref: 'root.logout',
      icon: 'sign-out',
      narrowOnly: true
    }
  ];

  return {
    restrict: 'E',
    templateUrl: FILE_ROOT + 'components/dv.web/app/auth/home/dv-side-bar.html',
    link: function (scope, el, attrs) {
      scope.menuOptions = menuOptions;
    }
  };
});