angular.module('dv.web.services').factory('CommonModalService', function ($modal, FILE_ROOT, ErrorDisplayService, AlertEventBroadcaster) {
  'use strict';
  var templates = FILE_ROOT + 'components/dv.web/services/modal-templates/';

  return {
    confirm: confirm
  };
  function confirm(options) {
    return $modal.open({
      templateUrl: templates + 'confirmation-template.html',
      controller: function($scope) {
        $scope.header = options.header || 'Are you sure?';
        $scope.message = options.message;
        $scope.yesButton = options.yesButton || 'Yes';
        $scope.yesButtonClass = options.yesButtonClass || 'btn-flat danger';
        $scope.cancelButton = options.cancelButton || 'Cancel';
      }
    });
  }

});