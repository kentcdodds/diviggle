/*
 * Provide an arry to this attribute directive that's structured like so:
 * [
 *   {
 *     name: 'has-id',
 *     fn: function(value) {
 *       return value && !!value.id;
 *     },
 *     watch: 'value' // will watch 'value' on the scope of the element this is on.
 *   },
 *   {
 *     name: 'other-custom',
 *     fn: function(value) {
 *       return /other/.test(value);
 *     }
 *     // no watch means this will simply be added to the controller's $parsers and invoked with the viewValue.
 *   }
 * ]
 */
angular.module('dv.common.directives').directive('dvCustomValidation', function(_) {
  'use strict';

  return {
    require: 'ngModel',
    link: function(scope, el, attrs, ctrl) {
      _.each(scope.$eval(attrs.dvCustomValidation), function(validator) {
        if (validator.watch) {
          scope.$watch(validator.watch, function(value) {
            applyValidity(validator, value);
          });
        } else {
          ctrl.$parsers.unshift(function(viewValue) {
            applyValidity(validator, viewValue);
            return viewValue;
          });
        }
      });
      function applyValidity(validator, value) {
        if (validator.fn(value)) {
          ctrl.$setValidity(validator.name, true);
        } else {
          ctrl.$setValidity(validator.name, false);
        }
      }
    }
  };
});