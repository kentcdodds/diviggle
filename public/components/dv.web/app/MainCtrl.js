angular.module('dv.web').controller('MainCtrl', function($scope, $rootScope, LoginState, MediaQueryService) {
  'use strict';

  $scope.$on('login.change', function(event, authenticated) {
    setupForAuthState(authenticated);
  });

  setupForAuthState(LoginState.isAuthenticated());

  function setupForAuthState(authenticated) {
    $scope.authenticated = authenticated;
    $scope.title = authenticated ? 'Diviggle' : 'Login | Diviggle';
  }

  // Root scope stuff, scary business.
  $rootScope.smallScreen = MediaQueryService.queries['small-screen'].matches;

  $rootScope.$on('media-query.small-screen', function(event, smallScreen) {
    $rootScope.smallScreen = smallScreen;
    $rootScope.$safeApply();
  });
});