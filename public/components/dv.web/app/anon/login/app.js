// Login config
// If any one feature gets to be too big, move it out to it's own app.js in that feature's folder.
angular.module('dv.web').config(function($stateProvider, StateUtilsProvider) {
  'use strict';

  $stateProvider.state('root.anon', {
    url: '',
    templateUrl: StateUtilsProvider.templates.anon + 'login/LoginCtrl.html',
    controller: 'LoginCtrl'
  });
});