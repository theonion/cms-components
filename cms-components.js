'use strict';

angular.module('lodash', []).constant('_', window._);

var cmsComponents = angular.module('cmsComponents', [
  'cmsComponents.auth',
  'cmsComponents.input'
]);

cmsComponents.provider('$render', function () {
  return {
    templateDirective: function templateDirective (directive) {
      return function () {
        return '<' + directive + '></' + directive + '>';
      }
    },
    renderToRoot: function toRoot(options) {
      options.views = {
        'cmsLayoutViewport@': {
          template: options.template,
          templateUrl: options.templateUrl,
          controller: options.controller,
          templateProvider: options.templateProvider
        }
      };

      delete options.template;
      delete options.templateUrl;
      delete options.controller;
      delete options.templateProvider;

      return options;
    },
    $get: function () {
      return {
        // angular-ui-router has a painful api to render child
        // views into their parent's root, rather than nest the html
        // this provides some small sugar around it
      }
    }
  }
});

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
