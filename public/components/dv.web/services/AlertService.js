angular.module('dv.web.services').factory('AlertService', function($rootScope, toastr, _) {
  'use strict';

  toastr.options.closeButton = true;
  toastr.options.positionClass = 'toast-bottom-right';

  var AlertService = {
    clear: function() {
      toastr.clear();
    }
  };

  function showToast(type, options, defaults) {
    var originalOptions = toastr.options;
    if (options.visibleTime) {
      toastr.options.timeOut = options.visibleTime;
    }
    if (options.extendedTime) {
      toastr.options.extendedTimeOut = options.extendedTime;
    }

    toastr[type](options.message || defaults.message, options.title);

    toastr.options = originalOptions;
  }

  var alertTypes = [
    { name: 'warning', defaults: { message: 'Warning! Not sure why...' } },
    { name: 'success', defaults: { message: 'Success!' } },
    { name: 'info', defaults: { message: 'Heads up!' } },
    { name: 'error', defaults: { messages: 'Something went wrong. Not sure what...' } }
  ];
  _.each(alertTypes, function(type) {
    AlertService[type.name] = function(options) {
      showToast(type.name, options, type.defaults);
    };
    $rootScope.$on('alert.' + type.name, function(event, options) {
      AlertService[type.name](options);
    });
  });

  return AlertService;
});