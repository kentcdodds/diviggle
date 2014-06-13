(function() {
  'use strict';
  var app = angular.module('dv.web.constants', []);
  function addConstant(name) {
    if (window[name]) {
      app.constant(name, window[name]);
    }
  }
  addConstant('toastr');

  app.constant('FILE_ROOT', '/');
})();