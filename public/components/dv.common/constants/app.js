(function() {
  'use strict';

  var app = angular.module('dv.common.constants', []);
  function addConstant(name) {
    if (window[name]) {
      app.constant(name, window[name]);
    }
  }
  addConstant('_');
  addConstant('moment');
  addConstant('pluralize');
  addConstant('Firebase');

  var firebaseRef = new Firebase(window.DV.FBAPI);
  app.constant('firebaseRef', firebaseRef);
  app.constant('loggedInUsersRef', firebaseRef.child('currentUsers'))
  app.constant('BASE_URL', '/');
})();