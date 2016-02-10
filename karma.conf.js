var path = require('path');

var testFiles = path.join('components', '**', '*.spec.js');

var preprocessors = {};
preprocessors[testFiles] = ['webpack'];

module.exports = function (config) {
  config.set({
    frameworks: [
      'chai',
      'mocha',
      'sinon'
    ],
    files: [
      path.join('bower_components', 'angular', 'angular.js'),

      testFiles
    ],
    preprocessors: preprocessors,
    browsers: ['PhantomJS'],
    webpack: {}
  });
};
