var fs = require('fs');
var _ = require('lodash-node');
var glob = require('glob');
var address = require('address');

module.exports = function(env) {
  'use strict';
  var topScripts = [
    'bower_components/angular/angular.js'
  ];
  if (/local/.test(env)) {
    topScripts.push('non_bower_components/MinFaker.js');
  }

  var styles = _.union([
    'non_bower_components/bootstrap-theme.min.css',
    'bower_components/font-awesome/css/font-awesome.min.css',
    'bower_components/toastr/toastr.min.css'
  ],
  getFilesInPath('public/styles/*.css', 'public/'));

  var scripts = _.union([
    // non angular related stuff
    'bower_components/jquery/dist/jquery.js',
    'bower_components/lodash/dist/lodash.js',
    'bower_components/moment/moment.js',
    'bower_components/toastr/toastr.min.js',
    'bower_components/firebase/firebase.js',
    'bower_components/firebase-simple-login/firebase-simple-login.js',

    // extra angular stuff from the core team

    // angular-ui
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',

    // other angular mods
    'non_bower_components/Scope.SafeApply.min.js',
    'bower_components/angularfire/angularfire.js'
  ],
    // diviggle stuff
    // common components first
    getSection('components/dv.common/constants'),
    getSection('components/dv.common/services'),
    getSection('components/dv.common/models'),
    getSection('components/dv.common/filters'),
    getSection('components/dv.common/directives'),
    getSection('components/dv.common'),

    // web components
    getSection('components/dv.web/constants'),
    getSection('components/dv.web/directives'),
    getSection('components/dv.web/services'),
    getSection('components/dv.web'));

  var data = {
    onDev: false,
    BASE_URL: 'http://kent.doddsfamily.us/diviggle/public/',
    FBAPI: 'https://diviggle.firebaseio.com/',
    topScripts: topScripts,
    stylesheets: styles,
    scripts: scripts,
    resourcePrefix: '/diviggle/public/'
  };
  if (/local/.test(env)) {
    data.onDev = true;
    data.BASE_URL = 'http://localhost:8000/';
    data.FBAPI = 'https://diviggle.firebaseio.com/';
    data.resourcePrefix = '/';
    scripts.push('one-off/long-errors.js');
  }

  return data;


  // FUNCTIONS

  function getFilesInPath(pattern, removePrefix) {
    var files = glob.sync(pattern);
    if (removePrefix) {
      _.each(files, function (file, num) {
        files[num] = file.substring(removePrefix.length);
      });
    }
    return files;
  }

  function getSection(name) {
    var prefix = 'public/';
    var appJs = getFilesInPath(prefix + name + '/app.js', prefix);
    var otherJsFiles = getFilesInPath(prefix + name + '/**/*.js', prefix);
    return _.union(appJs, otherJsFiles);
  }

};