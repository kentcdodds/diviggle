angular.module('dv.web.directives').directive('dvInputValidation', function (_, $timeout, $rootScope, UtilFunctions) {
  'use strict';
  function getGuid() {
    return 'dvInputValidationGuid' + UtilFunctions.guid();
  }
  var errorMessageAttribute = 'data-error-message-prop';
  var errorVisibleAttribute = 'data-error-visible-prop';
  var defaultMessages = {
    required: 'Required field',
    email: 'Invalid email'
  };

  return {
    restrict: 'A',
    transclude: true,
    template: function (el, attrs) {
      var errorGuid = getGuid();
      var visibleGuid = getGuid();
      var dataAttrs = [
        errorMessageAttribute + '="' + errorGuid + '"',
        errorVisibleAttribute + '="' + visibleGuid + '"'
      ].join(' ');
      var classes = '';
      if (el.hasClass('input-group')) {
        classes = 'class="input-group"';
      }
      return [
        '<div class="dv-input-validation-container" ' + dataAttrs + '>',
        '<span class="error-label label label-danger" ng-class="{\'visible\': ' + visibleGuid + '}">{{' + errorGuid + '}}</span>',
        '<span ng-transclude', classes, '></span>',
        '</div>'
      ].join(' ');
    },
    link: function (scope, el, attrs) {
      var $el = $(el);
      var namedEl = $el.find('[name]');
      if (_.isEmpty(namedEl)) {
        waitForInputEl(setupValidationWatcher);
      } else {
        setupValidationWatcher();
      }

      function waitForInputEl(callback) {
        var stopWatchingNamedEl = scope.$watch(function() {
          return $el.find('[name]').length;
        }, function(totalNamedEls) {
          if (totalNamedEls === 0) {
            return;
          }
          namedEl = $el.find('[name]');
          stopWatchingNamedEl();
          callback();
        });
        // prevent watching forever
        $timeout(function() {
          if (_.isEmpty(namedEl)) {
            stopWatchingNamedEl();
          }
        });
      }

      function setupValidationWatcher() {
        var formEl = $el.parents('form');
        var inputEl = $el.find('[name]');
        var formName = formEl.attr('name');
        var inputName = inputEl.attr('name');
        if (!formName || !inputName) {
          console.warn('dv-input-validation needs a parent form with a name and a child input with a name.', $el);
          return;
        }
        inputName = evaluateIfNecessary(inputName);
        formName = evaluateIfNecessary(formName);
        inputEl.addClass('position-relative');
        var formScope = angular.element(formEl).scope();
        var formGroup = $el.hasClass('form-group') ? $el : $el.parents('.form-group');
        var formItemSelector = formName + '[\'' + inputName + '\']';
        var formItem = formScope.$eval(formItemSelector);

        var dataAttrsEl = $el.find('.dv-input-validation-container');
        var errorMessageProperty = dataAttrsEl.attr(errorMessageAttribute);
        var errorVisibleProperty = dataAttrsEl.attr(errorVisibleAttribute);
        scope[errorMessageProperty] = 'No errors';

        var setVisibleDebounced = _.debounce(setErrorVisible, ~~attrs.delay || 300);

        formScope.$watch(formItemSelector + '.$error', function() {
          if (formItem.$valid || formItem.$pristine) {
            scope[errorVisibleProperty] = false;
            formGroup.removeClass('has-error');
          } else {
            var firstError = _.findKey(formItem.$error);
            var messages = scope.$eval(attrs.dvInputValidation) || {};
            var errorMessage = messages[firstError] || defaultMessages[firstError];
            scope[errorMessageProperty] = errorMessage || 'Invalid field';
            if (!errorMessage) {
              console.warn('Field error with no specific message: ' + errorMessage, $el);
            }
            setVisibleDebounced();
          }
        }, true);

        function setErrorVisible() {
          if (formItem.$valid || formItem.$pristine) {
            return;
          }
          formGroup.addClass('has-error');
          scope[errorVisibleProperty] = true;
          $rootScope.$safeApply();
        }

        function evaluateIfNecessary(string) {
          var expressionRegex = /(^\{\{\:\:)|(^\{\{)|(\}\}$)/g;
          if (expressionRegex.test(string)) {
            var expression = string.replace(expressionRegex, '');
            return scope.$eval(expression);
          } else {
            return string;
          }
        }
      }
    }
  };
});