var path = require('path');

var testFiles = path.join('components', '**', '*.spec.js');
var templateEntry = path.join('resources', 'js', 'testing', 'test-webpack-templates.js');

var preprocessors = {};
preprocessors[testFiles] = ['webpack'];
preprocessors[templateEntry] = ['webpack'];

module.exports = function (config) {
  config.set({
    frameworks: [
      'chai',
      'mocha',
      'sinon'
    ],
    files: [
      path.join('bower_components', 'angular', 'angular.js'),
      path.join('bower_components', 'angular-mocks', 'angular-mocks.js'),
      path.join('bower_components', 'angular-local-storage', 'dist', 'angular-local-storage.js'),
      path.join('bower_components', 'lodash', 'lodash.js'),

      path.join('resources', 'js', 'testing', 'test-helper.js'),

      templateEntry,
      testFiles
    ],
    preprocessors: preprocessors,
    browsers: ['PhantomJS'],
    webpack: {
      module: {
        loaders: [{
          test: /\.html$/,
          loader: 'ngtemplate',
          query: {
            module: 'cmsComponents.templates',
            relativeTo: __dirname + '/'
          }
        }, {
          test: /\.html$/,
          loader: 'html'
        }]
      }
    }
  });
};
