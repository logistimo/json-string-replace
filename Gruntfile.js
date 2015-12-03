/*
 * json-string-replace
 * 
 *
 * Copyright (c) 2015 Charan Malemarpuram
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    json_string_replace: {
      replacement: {
        options: {
            replacements: {"est":"ast","(\\d+)(\\d{3})":"$1,$2"},
            global: true
        },
        files: {
          'test': ['test/fixtures/testing']
        }
      },
        no_replacement: {
            options: {
                replacements: {"est":"ast"},
                global: true
            },
            files: {
                'test': ['test/fixtures/123']
            }
        }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'json_string_replace', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
