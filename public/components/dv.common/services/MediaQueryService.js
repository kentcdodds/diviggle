angular.module('dv.common.services').factory('MediaQueryService', function ($rootScope, $window) {
  'use strict';

  var queries = {};

  addQueryCallback('(max-width: 991px)', 'small-screen');

  return {
    queries: queries
  };

  function addQueryCallback(query, name) {
    var media = $window.matchMedia(query);
    queries[name] = {
      name: name,
      query: query,
      matches: false
    };
    function mediaQueryCallback() {
      queries[name].matches = media.matches;
      $rootScope.$broadcast('media-query.' + name, queries[name].matches);
    }
    media.addListener(mediaQueryCallback);
    mediaQueryCallback();
  }


});