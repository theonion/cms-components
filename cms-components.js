'use strict';

var cmsComponents = angular.module('cmsComponents', []);

cmsComponents.provider('$loadPathTemplateCache', function () {
  var templates = {};
  var loadPaths = [];

  return {
    loadPaths: function (paths) {
      loadPaths = loadPaths.concat(paths);
    },
    $get: function () {
      return {
        info: function (cacheId) {
          return templates[cacheId];
        },
        get: function (cacheId) {
          return templates[cacheId];
        },
        put: function (cacheId, template) {
          templates[cacheId] = template;
        },
        remove: function (cacheId) {
          delete templates[cacheId];
        },
        removeAll: function () {
          templates = {};
        },
        destroy: function () {
        },
        getAll: function () {
          return templates;
        },
        resolve: function (config) {
          var path = config.path;
          var component = config.component;

          var template = templates[path];
          if (template) { return template; }

          var paths = ['components/'+component].concat(loadPaths)
          var loadPath = _.detect(paths, function (loadPath) {
            var pathToLoad = [loadPath, path].join('/') + '.html';
            return templates[pathToLoad];
          });
          var pathToLoad = [loadPath, path].join('/') + '.html';
          return templates[pathToLoad];
        }
      };
    }
  };
})
