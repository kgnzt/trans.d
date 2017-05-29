'use strict';

const jshintReporter = require('jshint-junit-reporter'),
      lintableFiles  = ['src/**/*.js', 'example/**/*.js', 'test/**/*.js'],
      unitTestFiles  = ['test/unit/**/*_test.js'];

module.exports = function (grunt) {
  grunt.initConfig({
    mochaTest: {
      unit_stdout: {
        options: {
          reporter: 'spec'
        },
        src: unitTestFiles
      },
      unit_file: {
        options: {
          reporter: 'xunit',
          quiet: true,
          captureFile: './unit_test_results.xml'
        },
        src: unitTestFiles
      }
    },
    jshint: {
      options: {
        esnext: true,
        node: true,
        globals: {
          describe: false,
          it: false,
          before: false,
          beforeEach: false,
          after: false,
          afterEach: false
        }
      },
      stdout: {
        files: { src: lintableFiles }
      },
      file: {
        files: { src: lintableFiles },
        options: {
           reporterOutput: 'lint_test_results.xml',
           reporter: jshintReporter
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
};
