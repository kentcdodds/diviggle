angular.module('dv.web.services').provider('StateUtils', function(_, FILE_ROOT) {
  'use strict';
  var rootUrl = '/';
  var templateRoot = FILE_ROOT + 'components/dv.web/app/';
  var divView = '<div ui-view></div>';
  _.extend(this, {
    rootUrl: rootUrl,
    templates: {
      root: templateRoot,
      home: templateRoot + 'auth/home/',
      anon: templateRoot + 'anon/'
    },
    templateRoot: templateRoot,
    divView: divView,
    resolveParameter: resolveParameter,
    resolveAuth: resolveAuth,
    resolveIdentity: resolveIdentity,
    $get: function StateUtilsGet() {
      return this;
    }
  });

  function resolveParameter(param) {
    return function($stateParams) {
      return $stateParams[param];
    };
  }

  function resolveAuth() {
    return function (LoginState) {
      return LoginState.isAuthenticated();
    };
  }

  function resolveIdentity(val) {
    return function() {
      return val;
    };
  }
});