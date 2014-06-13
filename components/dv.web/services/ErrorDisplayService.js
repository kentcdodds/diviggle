angular.module('dv.web.services').factory('ErrorDisplayService', function (_, $rootScope, $compile, FILE_ROOT, $modal, AlertEventBroadcaster) {
  'use strict';
  var template = [
    '<span>There <ng-pluralize count="errors.length" when="{\'0\': \'were no errors\',',
    '\'one\': \'was one error\', \'other\': \'were {} errors\'}"></ng-pluralize>.',
    '<a ng-click="showModal(errors)">Click here to see',
    '<ng-pluralize count="errors.length" when="{\'one\': \'it.\', \'other\': \'them.\'}"></ng-pluralize>',
    '</a></span>'
  ].join(' ');

  var responseDefaults = {
    500: {
      message: 'An unknown error occurred'
    },
    404: {
      message: 'Unable to find something on the server...'
    }
  };

  return {
    getErrorResponseHandler: getErrorResponseHandler,
    handleErrorResponse: handleErrorResponse,
    displayErrors: displayErrors
  };

  function getErrorResponseHandler(options) {
    return function(response, status) {
      return handleErrorResponse(response, status, options);
    };
  }

  function handleErrorResponse(response, status, errorStatements) {
    status = status || response.status;
    errorStatements = errorStatements || {};
    var errorAndCallback = getErrorsAndCallback(response, status, _.extend(responseDefaults, errorStatements));
    errorAndCallback.errors = errorAndCallback.callback(response, status, errorStatements) || errorAndCallback.errors;
    displayErrors(errorAndCallback.errors);
  }

  function displayErrors(errorObject) {
    if (_.isEmpty(errorObject)) {
      return;
    }
    if (_.isString(errorObject)) {
      errorObject = {
        message: errorObject
      };
    }
    var errorArray = _.toArray(errorObject);
    var errorsString = '<ul><li>' + errorArray.join('</li><li>') + '</li></ul>';
    if (errorArray.length === 1) {
      errorsString = errorArray[0];
    }
    if (errorsString.length > 124) {
      var tempScope = $rootScope.$new();
      var message = $compile(angular.element(template))(_.extend(tempScope, {
        errors: errorArray,
        showModal: function(errors) {
          return $modal.open({
            templateUrl: FILE_ROOT + 'components/dv.web/services/modal-templates/errors-more-info.html',
            controller: function($scope) {
              $scope.errors = errors;
            }
          });
        }
      }));
      AlertEventBroadcaster.broadcast({
        type: 'error',
        message: message,
        visibleTime: 10000,
        extendedTime: 7500
      });
      $rootScope.$safeApply();
    } else {
      AlertEventBroadcaster.broadcast({
        type: 'error',
        message: errorsString,
        visibleTime: 10000,
        extendedTime: 7500
      });
    }
  }

  // UTIL FUNCTIONS
  function getErrorsAndCallback(response, status, errorStatements) {
    var errors = response.data || response;
    var callback = angular.noop;
    var statementObject = errorStatements[status];
    if (statementObject) {
      errors = statementObject.message ? { message: statementObject.message } : errors;
      callback = statementObject.callback || callback;
    }
    return {
      errors: errors,
      callback: callback
    };
  }
});