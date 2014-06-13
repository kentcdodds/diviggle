/*
 * The dv.common module combines all dv.common.* modules. The providers in this module
 * can be shared between the browser and a mobile app for PhoneGap (built with ionic for example).
 */
angular.module('dv.common', [
  'dv.common.constants',
  'dv.common.services',
  'dv.common.filters',
  'dv.common.directives'
]);