angular.module('dv.common.directives').directive('dvSpecialInput', function ($filter) {
  'use strict';
  var formatters = {
    phone: {
      toModel: function(string) {
        return string.replace(/\D|\+/g, '');
      },
      toView: $filter('dvPhone')
    }
  };
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, el, attrs, controller) {
      var formatter = formatters[attrs.dvSpecialInput];
      if (!formatter) {
        return;
      }
      var $el = $(el);

      controller.$parsers.push(formatter.toModel);
      controller.$formatters.push(formatter.toView);
      $el.on('change', function() {
        var oldVal = $el.val();
        var newVal = formatter.toView(formatter.toModel(oldVal));
        $el.val(newVal);
      });
      $el.on('keypress', function(event) {
        return isNumber(event) || isParen(event) || isDash(event) || isSpace(event);
      });
    }
  };

  // UTIL FUNCTIONS
  function isNumber(event) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  function isParen(event) {
    return event.charCode === 40 || event.charCode === 41;
  }

  function isDash(event) {
    return event.charCode === 45;
  }

  function isSpace(event) {
    return event.charCode === 32;
  }

});