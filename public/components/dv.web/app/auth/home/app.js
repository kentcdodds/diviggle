// Home config
// If any one feature gets to be too big, move it out to it's own app.js in that feature's folder.
angular.module('dv.web').config(function($stateProvider, StateUtilsProvider) {
  'use strict';

  $stateProvider.state('root.auth', {
    abstract: true,
    url: '',
    template: StateUtilsProvider.divView
  });

  $stateProvider.state('root.auth.home', {
    url: '',
    abstract: true,
    templateUrl: StateUtilsProvider.templates.home + 'HomeCtrl.html'
  });

  $stateProvider.state('root.auth.home.main', {
    url: '',
    templateUrl: StateUtilsProvider.templates.home + '/MainHomeCtrl/MainHomeCtrl.html',
    controller: 'MainHomeCtrl'
  });
});