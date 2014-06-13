/*
 * The purpose of this is to listen to common events and broadcast them on an 'alert.{{type}}' event
 * The idea is that a platform-specific implementation of a user alert system will listen to the 'alert.{{type}}'
 * event and respond by showing a message to the user. This must be initialized
 */
angular.module('dv.common.services').factory('AlertEventBroadcaster', function($rootScope, RandomWords, _) {
  'use strict';

  return {
    broadcast: broadcast,
    initialize: function(alertEvents) {
      _.each(alertEvents, function(alertEvent) {
        $rootScope.$on(alertEvent.name, function(event, obj, error) {
          if (alertEvent.type && (!obj || !obj.noAlert)) {
            broadcast(alertEvent, error);
          }
          console.log(event.name, arguments);
        });
      });
    }
  };

  /*
   * This is intended to be received by some sort of alert service to
   * alert the user of the event.
   */
  function broadcast(alertEvent, error) {
    var title = getAlertTitle(alertEvent);
    var message = getAlertMessage(alertEvent, error || {});
    $rootScope.$broadcast('alert.' + alertEvent.type, {
      message: message,
      title: title,
      visibleTime: alertEvent.visibleTime || 5000,
      extendedTime: alertEvent.extendedTime || 5000
    });
  }

  // UTILITY FUNCTIONS
  function getAlertTitle(alertEvent) {
    return _.isString(alertEvent.title) ? alertEvent.title : RandomWords[alertEvent.type]();
  }

  function getAlertMessage(alertEvent, error) {
    var message = [alertEvent.message, error.message || ''].join(' ');
    if (alertEvent.message && (_.isElement(alertEvent.message) || _.isElement(alertEvent.message[0]))) {
      message = alertEvent.message;
    }
    return message;
  }
});