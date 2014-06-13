module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: {
        src: [ 'public/components/**/*.js' ]
      }
    },
    cssmin: {
      bootstrapTheme: {
        files: {
          'public/non_bower_components/bootstrap-theme/compressed/bootstrap-theme-compressed.css': [
            '!public/non_bower_components/bootstrap-theme/css/bootstrap/bootstrap.css',
            'public/non_bower_components/bootstrap-theme/css/bootstrap/bootstrap-overrides.css',
            'public/non_bower_components/bootstrap-theme/css/compiled/**/*.css',
            'public/non_bower_components/bootstrap-theme/css/lib/**/*.css'
          ]
        }
      }
    },
    stylus: {
      compile: {
        options: {
          linenos: true,
          define: {
            imgLocation: '/components/dv.common/images/'
          }
        },
        files: {
          'public/styles/styles.css': [
            'public/components/dv.common/stylus/add-first.styl',
            'public/components/dv.common/**/*.styl',
            'public/components/dv.web/**/*.styl'
          ]
        }
      }
    },
    jade: {
      local: {
        options: {
          data: function() {
            return require('./jade/getIndexData')('local');
          },
          pretty: true
        },
        files: {
          'public/index.html': ['jade/index.jade']
        }
      }
    },
    watch: {
      stylus: {
        files: ['public/**/*.styl'],
        tasks: 'stylus'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-sloc');

  grunt.registerTask('nohint', ['stylus', 'jade']);
  grunt.registerTask('build', ['jshint', 'nohint']);
  // Default task(s).
  grunt.registerTask('default', 'build');

};