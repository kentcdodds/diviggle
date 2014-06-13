(function() {
  'use strict';

  var app = angular.module('dv.common.services', ['dv.common.constants']);

  app.constant('FBAPI', window.DV.FBAPI);

  app.run(function($window, MediaQueryService) {
    // Injecting MediaQueryService so it is initialized.

    // If we're on dev, then add a few things to the global DV object for debugging.
    if ($window.DV && $window.DV.onDev) {
    }
  });
})();
