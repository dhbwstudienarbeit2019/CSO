// Karma configuration
// Generated on Fri Apr 19 2019 23:24:02 GMT+0200 (GMT+02:00)
var webpackConfig = require('./webpack.config.js')("test");

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'karma-typescript','detectBrowsers'],

    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    // list of files / patterns to load in the browser
    files: [
      'spec/**/*.spec.ts'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //      "**/*.ts": "karma-typescript"
      "**/*.ts": "webpack"
    },
    webpack: webpackConfig,
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'dots', 'karma-typescript', 'kjhtml'],
    webpackMiddleware: {
      noInfo: true
    },
    // configuration
    detectBrowsers: {
      // enable/disable, default is true
      enabled: true,

      // enable/disable phantomjs support, default is true
      usePhantomJS: true,

      // use headless mode, for browsers that support it, default is false
      preferHeadless: true,

      // post processing of browsers list
      // here you can edit the list of browsers used by karma
      postDetection: function (availableBrowsers) {
        const result = availableBrowsers;

        //Remove PhantomJS if another browser has been detected
        if (availableBrowsers.length > 1 && availableBrowsers.indexOf('PhantomJS') > -1) {
          const i = result.indexOf('PhantomJS');

          if (i !== -1) {
            result.splice(i, 1);
          }
        }

        return result;
      }
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chromium', 'Firefox', 'IE'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
