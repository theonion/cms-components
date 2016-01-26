/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	angular.module('cmsComponents.templates', []);
	var context = __webpack_require__(2);
	context.keys().map(context);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var cmsComponents = angular.module('cmsComponents', []);

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
	          templateUrl: options.templateUrl,
	          controller: options.controller,
	          templateProvider: options.templateProvider
	        }
	      };

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./auth/auth-interceptor.js": 3,
		"./auth/auth-service.js": 4,
		"./auth/current-user.js": 5,
		"./auth/http-request-buffer-factory.js": 6,
		"./betty-cropper/betty-cropper.js": 7,
		"./betty-cropper/betty-cropper.scss": 8,
		"./betty-cropper/betty-editable.html": 12,
		"./betty-cropper/betty-editable.js": 13,
		"./betty-cropper/betty-service.js": 14,
		"./betty-cropper/image-crop-modal.html": 15,
		"./betty-cropper/image-crop-modal.js": 16,
		"./betty-cropper/open-image-crop-modal.js": 17,
		"./cms-button/cms-button.html": 18,
		"./cms-button/cms-button.js": 19,
		"./cms-button/cms-button.scss": 20,
		"./cms-component/cms-component.html": 22,
		"./cms-component/cms-component.js": 23,
		"./cms-component/cms-component.scss": 24,
		"./cms-container/cms-container.html": 26,
		"./cms-container/cms-container.js": 27,
		"./cms-container/cms-container.scss": 28,
		"./cms-content-list/cms-content-list.html": 30,
		"./cms-content-list/cms-content-list.js": 31,
		"./cms-content-list/cms-content-list.scss": 32,
		"./cms-filter-item/cms-filter-item.html": 34,
		"./cms-filter-item/cms-filter-item.js": 35,
		"./cms-filter-item/cms-filter-item.scss": 36,
		"./cms-filter-set/cms-filter-set.html": 38,
		"./cms-filter-set/cms-filter-set.js": 39,
		"./cms-filter-set/cms-filter-set.scss": 40,
		"./cms-flyout/cms-flyout.html": 42,
		"./cms-flyout/cms-flyout.js": 43,
		"./cms-flyout/cms-flyout.scss": 44,
		"./cms-input/cms-input.html": 46,
		"./cms-input/cms-input.js": 47,
		"./cms-input/cms-input.scss": 48,
		"./cms-layout/cms-layout.html": 50,
		"./cms-layout/cms-layout.js": 51,
		"./cms-layout/cms-layout.scss": 52,
		"./cms-legend/cms-legend.html": 55,
		"./cms-legend/cms-legend.js": 56,
		"./cms-legend/cms-legend.scss": 57,
		"./cms-login/login.html": 59,
		"./cms-login/login.js": 60,
		"./cms-login/login.scss": 61,
		"./cms-logout/logout.html": 63,
		"./cms-logout/logout.js": 64,
		"./cms-partial/cms-partial.html": 65,
		"./cms-partial/cms-partial.js": 66,
		"./cms-partial/cms-partial.scss": 67,
		"./cms-row/cms-row.html": 69,
		"./cms-row/cms-row.js": 70,
		"./cms-row/cms-row.scss": 71,
		"./cms-table-cell/cms-table-cell.html": 73,
		"./cms-table-cell/cms-table-cell.js": 74,
		"./cms-table-cell/cms-table-cell.scss": 75,
		"./cms-table-column/cms-table-column.html": 77,
		"./cms-table-column/cms-table-column.js": 78,
		"./cms-table-column/cms-table-column.scss": 79,
		"./cms-table/cms-table.html": 81,
		"./cms-table/cms-table.js": 82,
		"./cms-table/cms-table.scss": 83,
		"./sidebar-nav-item/sidebar-nav-item.html": 85,
		"./sidebar-nav-item/sidebar-nav-item.js": 86,
		"./sidebar-nav-item/sidebar-nav-item.scss": 87,
		"./ui-sref-active-if/ui-sref-active-if.js": 89,
		"./user-menu/user-menu.html": 90,
		"./user-menu/user-menu.js": 91,
		"./user-menu/user-menu.scss": 92,
		"./user-profile/user-profile.html": 94,
		"./user-profile/user-profile.js": 95,
		"./user-profile/user-profile.scss": 96
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents').factory('authInterceptor', ['$q', '$location', '$injector', 'localStorageService', 'httpRequestBuffer', function ($q, $location, $injector, localStorageService, httpRequestBuffer) {

	  var factory = {};

	  factory.request = function (config) {
	    config.headers = config.headers || {};
	    var token = localStorageService.get('authToken');
	    var isBettyCropperRequest = _.has(config.headers, 'X-Betty-Api-Key');
	    if (token && !config.ignoreAuthorizationHeader && !isBettyCropperRequest) {
	      config.headers.Authorization = 'JWT ' + token;
	    }
	    return config;
	  };

	  factory.responseError = function (response) {
	    if (response.config) {
	      var ignoreAuthModule = response.config.ignoreAuthModule || response.config.headers.ignoreAuthModule;
	      if (!ignoreAuthModule) {
	        if (response.status === 403 || response.status === 401) {
	          var deferred = $q.defer();
	          httpRequestBuffer.append(response.config, deferred);
	          var authService = $injector.get('authService');
	          authService.refreshToken();
	        }
	      }
	    }
	    return $q.reject(response);
	  };

	  return factory;
	}]);


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents').service('authService', ['$rootScope', '$location', '$http', 'httpRequestBuffer', 'localStorageService', 'alertService', 'Config', 'CurrentUser',
	function ($rootScope, $location, $http, httpRequestBuffer, localStorageService, alertService, Config, CurrentUser) {
	  var service = {};

	  service.login = function (username, password) {
	    return $http.post(Config.apiHost + '/api/token/auth', {
	      username: username,
	      password: password
	    })
	    .success(service.loginSuccess)
	    .error(service.loginError);
	  };

	  service.logout = function () {
	    localStorageService.remove('authToken');
	  };

	  service.loginSuccess = function(response) {
	    localStorageService.set('authToken', response.token);
	  };

	  service.loginError = function(response) {
	    alertService.addAlert('Username or password provided is incorrect.', 'danger');
	  };

	  service.refreshToken = function () {
	    var token = localStorageService.get('authToken');
	    return $http.post(Config.apiHost + '/api/token/refresh', { token: token }, { ignoreAuthModule: true })
	    .success(service.tokenRefreshed)
	    .error(service.tokenRefreshError);
	  };

	  service.tokenRefreshed = function(response) {
	    localStorageService.set('authToken', response.token);
	    httpRequestBuffer.retryAll();
	  };

	  service.tokenRefreshError = function(response) {
	    httpRequestBuffer.rejectAll();
	    alertService.addAlert('You failed to authenticate. Redirecting to login.', 'danger');
	    CurrentUser.logout();
	  };

	  return service;
	}]);


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .service('CurrentUser', function (localStorageService, $location, $rootScope) {
	    this.currentUser = null;
	    this.getCurrentUser = function () {
	      return localStorageService.get('currentUser');
	    };

	    this.setCurrentUser = function (newCurrentUser) {
	      localStorageService.set('currentUser', newCurrentUser);
	      $rootScope.$broadcast('userchange');
	    };

	    this.logout = function () {
	      this.currentUser = null;
	      $rootScope.$broadcast('userchange');
	      localStorageService.remove('authToken');
	      localStorageService.remove('currentUser');
	      $location.path('/login');
	    };
	  });


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents').service('httpRequestBuffer', ['$injector', function ($injector) {
	  var buffer = [];

	  function _retryHttpRequest(config, deferred) {
	    function successCallback(response) {
	      deferred.resolve(response);
	    }

	    function errorCallback(response) {
	      deferred.reject(response);
	    }
	    config.headers.ignoreAuthModule = true;
	    var $http = $http || $injector.get('$http');
	    $http(config).then(successCallback, errorCallback);
	  }

	  return {
	    append: function (config, deferred) {
	      buffer.push({
	        config: config,
	        deferred: deferred
	      });
	    },
	    rejectAll: function (reason) {
	      if (reason) {
	        _.each(buffer, function (request) {
	          request.deferred.reject(reason);
	        });
	      }
	      buffer = [];
	    },
	    retryAll: function () {
	      _.each(buffer, function (request) {
	        _retryHttpRequest(request.config, request.deferred);
	      });
	      buffer = [];
	    }
	  };
	}]);


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	(function () {
	  angular.module('BettyCropper', ['restmod', 'ui.bootstrap'])
	    .value('DEFAULT_IMAGE_WIDTH', 1200)
	    .factory('Selection', SelectionFactory)
	    .factory('BettyImage', BettyImageFactory)
	    .service('BettyCropper', BettyCropperService);

	  function BettyCropperService($http, $q, BettyImage, $, ApiServicesConfig) {

	    // alias this
	    var service = this;

	    // get the input by id
	    var fileInputId = '#bulbs-cms-hidden-image-file-input';
	    var inputTemplate = '<input id="bulbs-cms-hidden-image-file-input" type="file" accept="image/*" style="position: absolute; left:-99999px;" name="image" />';

	    // set the functionality of the service
	    service.upload = upload;
	    service.get = get;
	    service.detail = get;
	    service.updateSelection = updateSelection;

	    var config = BettyImage.config = this.config = {
	      imageServerUrl: ApiServicesConfig.bettyRoot,
	      publicToken: ApiServicesConfig.bettyKey
	    };

	    // create the service functions
	    function upload() {
	      var uploadImageDeferred = $q.defer();

	      angular.element(fileInputId).remove();
	      var fileInput = angular.element(inputTemplate);
	      angular.element('body').append(fileInput);

	      fileInput.click();

	      fileInput.unbind('change');
	      fileInput.bind('change', function (e) {
	        if (e.target.files.length !== 1) {
	          uploadImageDeferred.reject('We need exactly one image!');
	        }
	        var file = e.target.files[0];
	        if (file.type.indexOf('image/') !== 0) {
	          uploadImageDeferred.reject('Not an image!');
	        }

	        if (file.size > 10 * 1024 * 1024) { // MAGIC!
	          uploadImageDeferred.reject('The file is too large!');
	        }

	        var imageData = new FormData();
	        imageData.append('image', file);

	        $http({
	          method: 'POST',
	          url: ApiServicesConfig.bettyRoot + '/api/new',
	          headers: {
	            'X-Betty-Api-Key': ApiServicesConfig.bettyKey,
	            'Content-Type': undefined,
	            'X-CSRFToken': undefined
	          },
	          data: imageData,
	          transformRequest: angular.identity,
	          transformResponse: function (data, headersGetter) {
	            // So, sometimes the browser doesn't think that JSON data is JSON.
	            if (typeof data === 'string') {
	              data = $.parseJSON(data);
	            }
	            var image = new BettyImage(data);
	            return image;
	          }
	        }).success(function (success) {
	          uploadImageDeferred.resolve(success);
	        }).error(function (error) {
	          uploadImageDeferred.reject(error);
	        });

	      });

	      return uploadImageDeferred.promise;
	    }

	    function get(id) {
	      return $http({
	        method: 'GET',
	        url: ApiServicesConfig.bettyRoot + '/api/' + id,
	        headers: {
	          'X-Betty-Api-Key': ApiServicesConfig.bettyKey,
	          'Content-Type': undefined,
	          'X-CSRFToken': undefined
	        },
	        transformRequest: angular.identity,
	        transformResponse: function (data, headersGetter) {
	          if (typeof data === 'string') {
	            data = $.parseJSON(data);
	          }
	          return new BettyImage(data);
	        }
	      });
	    }

	    function updateSelection(id, ratio, selections) {
	      return $http({
	        method: 'POST',
	        url: ApiServicesConfig.bettyRoot + '/api/' + id + '/' + ratio,
	        headers: {
	          'X-Betty-Api-Key': ApiServicesConfig.bettyKey,
	          'Content-Type': undefined,
	          'X-CSRFToken': undefined
	        },
	        data: selections
	      });
	    }
	  }

	  function BettyImageFactory($interpolate, $http, ApiServicesConfig, DEFAULT_IMAGE_WIDTH, Selection, $) {

	    function BettyImage(data) {
	      this.id = data.id;
	      this.name = data.name;
	      this.width = data.width;
	      this.height = data.height;
	      this.selections = {};
	      for (var ratio in data.selections) {
	        this.selections[ratio] = new Selection(data.selections[ratio]);
	      }
	    }

	    BettyImage.prototype.scaleToFit = function (width, height) {
	      var scale;

	      // if scale set
	      if (width && height) {
	        var fitRatio = width / height;
	        var thisRatio = this.width / this.height;
	        if (fitRatio > thisRatio) {
	          scale = height / this.height;
	        } else {
	          scale = width / this.width;
	        }
	      }

	      // if only height
	      else if (height) {
	        scale = height / this.height;
	      }

	      // if only width
	      else if (width) {
	        scale = width / this.width;
	      }

	      // set scale object
	      var scaled = {
	        width: Math.round(this.width * scale),
	        height: Math.round(this.height * scale),
	        scale: scale
	      };

	      return scaled;
	    };

	    BettyImage.prototype.getStyles = function (width, height, ratio) {
	      // reset height
	      if (height === 0) {
	        height = null;
	      }

	      // set selections
	      var selection = this.selections[ratio];
	      var scaledSelection = selection.scaleToFit(width, height);

	      // dump style config object
	      return {
	        'background-image': 'url(' + this.url('original', DEFAULT_IMAGE_WIDTH, 'jpg') + ')',
	        'background-size': Math.floor(scaledSelection.width() / selection.width() * this.width) + 'px',
	        'background-position': '-' + scaledSelection.x0 + 'px -' + scaledSelection.y0 + 'px',
	        'height': scaledSelection.height() + 'px',
	        'width': scaledSelection.width() + 'px',
	        'background-repeat': 'no-repeat',
	        'position': 'relative'
	      };
	    };

	    BettyImage.prototype.url = function (ratio, width, format) {
	      var exp = $interpolate('{{ base_url }}/{{ id }}/{{ ratio }}/{{ width }}.{{ format }}');
	      var idStr = this.id.toString();
	      var segmentedId = '';

	      for (var i = 0; i < idStr.length; i++) {
	        if (i % 4 === 0 && i !== 0) {
	          segmentedId += '/';
	        }
	        segmentedId += idStr.substr(i, 1);
	      }

	      return exp({
	        base_url: ApiServicesConfig.bettyRoot,
	        id: segmentedId,
	        ratio: ratio,
	        width: width,
	        format: format
	      });
	    };

	    BettyImage.prototype.updateSelection = function (ratio, selection) {
	      // set data object
	      var data = {
	        x0: selection.x0,
	        x1: selection.x1,
	        y0: selection.y0,
	        y1: selection.y1
	      };
	      if (selection.source) {
	        data.source = selection.source;
	      }

	      // go get it
	      return $http({
	        method: 'POST',
	        url: ApiServicesConfig.bettyRoot + '/api/' + this.id + '/' + ratio,
	        headers: {
	          'X-Betty-Api-Key': ApiServicesConfig.bettyKey,
	          'Content-Type': undefined,
	          'X-CSRFToken': undefined
	        },
	        data: data,
	        transformResponse: function (data) {
	          if (typeof data === 'string') {
	            data = $.parseJSON(data);
	          }
	          return [ratio, new Selection(data.selections[ratio])];
	        }
	      });
	    };

	    return BettyImage;
	  }

	  function SelectionFactory() {
	    function Selection(data) {
	      this.x0 = data.x0;
	      this.x1 = data.x1;
	      this.y0 = data.y0;
	      this.y1 = data.y1;
	      this.source = data.source;
	    }

	    Selection.prototype.width = function () {
	      return this.x1 - this.x0;
	    };

	    Selection.prototype.height = function () {
	      return this.y1 - this.y0;
	    };

	    Selection.prototype.scaleBy = function (scale) {
	      var scaledToFit = new Selection({
	        x0: Math.round(this.x0 * scale),
	        x1: Math.round(this.x1 * scale),
	        y0: Math.round(this.y0 * scale),
	        y1: Math.round(this.y1 * scale)
	      });
	      return scaledToFit;
	    };

	    Selection.prototype.scaleToFit = function (width, height) {
	      var scale;

	      // if width and height set
	      if (width && height) {
	        var fitRatio = width / height;
	        var thisRatio = this.width() / this.height();
	        if (fitRatio > thisRatio) {
	          scale = height / this.height();
	        } else {
	          scale = width / this.width();
	        }
	      }

	      // if height
	      else if (height) {
	        scale = height / this.height();
	      }

	      // if width
	      else if (height) {
	        scale = width / this.width();
	      }

	      return this.scaleBy(scale);
	    };

	    return Selection;
	  }
	})();


/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	var path = 'components/betty-cropper/betty-editable.html';
	var html = "<button class=\"betty-editable-add-image add-feature-image btn col-md-12\"\n        ng-click=\"upload();\"\n        ng-hide=\"image && image.id\"\n        ng-class=\"addStyles\"\n        ng-disabled=\"isDisabled\">\n  <i class=\"fa fa-picture-o fa-3x\"></i>\n  <div>Upload Image</div>\n</button>\n\n<div ng-show=\"image && image.id\"\n     ng-style=\"imageStyling\"\n     class=\"image-edit-container\">\n  <div class=\"image-edit-overlay\"\n       ng-show=\"editable\">\n    <div class=\"remove\">\n      <button ng-click=\"removeImage();\"\n              class=\"fa fa-trash-o\"></button>\n    </div>\n    <div class=\"edit\">\n      <button name=\"inline_edit\"\n              ng-click=\"edit();\">\n        EDIT\n      </button>\n    </div>\n  </div>\n</div>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('bettyEditable', ['$http', 'BettyCropper', 'openImageCropModal', function ($http, BettyCropper, openImageCropModal) {
	    return {
	      templateUrl: 'components/betty-cropper/betty-editable.html',
	      restrict: 'E',
	      transclude: true,

	      scope: {
	        'image': '=',
	        'addStyles': '@',
	        'placeholderText': '@',
	        'ratio': '@',
	        'editable': '=?',
	        'imageChangeCallback': '=',
	        'isDisabled': '='
	      },

	      controller: ['$scope', function ($scope) {
	        $scope.editable = angular.isDefined($scope.editable) ? $scope.editable : true;

	        $scope.callImageChangeCallback = function (param) {
	          if (_.isFunction($scope.imageChangeCallback)) {
	            $scope.imageChangeCallback(param);
	          }
	        };

	        $scope.upload = function () {
	          BettyCropper.upload().then(
	            function (success) {
	              $scope.image = {
	                id: success.id,
	                caption: null,
	                alt: null
	              };
	              $scope.bettyImage = success;
	              $scope.callImageChangeCallback(success);
	            },
	            function (error) {
	              console.error(error);
	            },
	            function (progress) {
	              console.log(progress);
	            }
	          );
	        };

	        $scope.edit = function () {
	          openImageCropModal($scope.image).then(function (image) {
	            if (!image.id) {
	              $scope.image = null;
	            } else {
	              $scope.image = image;
	              BettyCropper.get($scope.image.id).then(function (response) {
	                $scope.bettyImage = response.data;
	                $scope.setStyles();
	              });
	            }

	            $scope.callImageChangeCallback();
	          });
	        };
	      }],

	      link: function (scope, element) {

	        if (!scope.bettyImage) {
	          scope.bettyImage = null;
	        }

	        scope.setStyles = function () {
	          if (scope.bettyImage) {
	            scope.imageStyling = scope.bettyImage.getStyles(element.parent().width(), element.parent().height(), scope.ratio);
	          } else {
	            var ratioWidth = parseInt(scope.ratio.split('x')[0], 10);
	            var ratioHeight = parseInt(scope.ratio.split('x')[1], 10);
	            scope.imageStyling = {
	              'background-color': '#333',
	              'position': 'relative',
	              'width': element.parent().width(),
	              'height': Math.floor(element.parent().width() * ratioHeight / ratioWidth) + 'px',
	            };
	          }
	        };

	        scope.$watch('image', function (newImage) {
	          if (newImage && newImage.id) {
	            BettyCropper.get(newImage.id).then(function (response) {
	              scope.bettyImage = response.data;
	            });
	          }
	        });

	        scope.$watch('bettyImage', function () {
	          scope.setStyles();
	        }, true);

	        element.resize(scope.setStyles);

	        scope.removeImage = function () {
	          scope.image.id = null;
	          scope.callImageChangeCallback();
	        };

	        scope.editImage = function () {
	          openImageCropModal(scope.image).then(function (success) {});
	        };
	      }
	    };
	  }]);


/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .service('BettyService', ['$http', 'Config', 'BettyCropper', function ($http, Config, BettyCropper) {
	    var service = {};

	    service.updateBettyConfig = function () {
	      return $http.get(Config.apiUrl + 'photo-service-details/')
	        .success(service.bettyConfigRetrieved);
	    };

	    service.bettyConfigRetrieved = function (response) {
	      BettyCropper.config.publicToken = response.public_token;
	      BettyCropper.config.imageServerUrl = response.image_url;
	    };

	    return service;
	  }]);


/***/ },
/* 15 */
/***/ function(module, exports) {

	var path = 'components/betty-cropper/image-crop-modal.html';
	var html = "<div class=\"image-cropper-modal\" tabindex=\"1\">\n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" ng-click=\"$dismiss();\" aria-hidden=\"true\">&times;</button>\n    <h4 class=\"modal-title\" ng-hide=\"cropMode\">Edit Image Options</h4>\n    <h4 class=\"modal-title\" ng-show=\"cropMode\">Crop Image</h4>\n  </div>\n  <div class=\"modal-body\">\n    <div ng-hide=\"cropMode\">\n\n      <h5>Set Image Crops</h5>\n      <ul class=\"thumb-list\">\n        <li ng-repeat=\"ratio in ratios\">\n          <div class=\"cropped-thumb-container\" ng-style=\"thumb_container_styles[ratio]\" ng-click=\"selectCrop(ratio)\">\n            <div ng-style=\"thumb_styles[ratio]\" class=\"cropped-thumb\">\n            </div>\n          </div>\n          <span class=\"fa\" ng-class=\"isCropDone(ratio)\"><strong>{{ ratio }}</strong></span>\n        </li>\n      </ul>\n      <div ng-show=\"imageData.hasOwnProperty('caption')\" class=\"caption-container\">\n        <hr>\n        <div class=\"row\">\n          <div class=\"form-group col-md-6\">\n            <label class=\"control-label small\">Caption / Photo Credit</label>\n            <input type=\"text\" class=\"form-control\" placeholder=\"Brief explanation of image\" ng-model=\"imageData.caption\" />\n          </div>\n          <div class=\"form-group col-md-6\">\n            <label class=\"control-label small\">Alt Text</label>\n            <input type=\"text\" class=\"form-control\" placeholder=\"Describe image's contents\" ng-model=\"imageData.alt\" />\n          </div>\n        </div>\n      </div>\n    </div>\n    <div ng-show=\"cropMode\">\n      <div class=\"crop-image-container\">\n        <img ng-src=\"{{ image_url }}\" width=\"{{ scaleData.width }}\" height=\"{{ scaleData.height }}\" />\n      </div>\n      <div class=\"ratio-paginator\">\n        <span\n          ng-repeat=\"ratio in ratios\"\n          ng-class=\"image.selections[ratio].source\"\n          class=\"fa\"\n          ng-click=\"selectCrop(ratio)\">{{ ratio }}</span>\n\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <div ng-hide=\"cropMode\">\n      <button class=\"btn btn-success\" ng-click=\"closeModal();\">Done</button>\n    </div>\n    <div ng-show=\"cropMode\">\n      <button class=\"btn btn-link\" ng-click=\"saveAndQuit()\" ng-hide=\"finished\">Save and Finish</button>\n      <button class=\"btn btn-success\" ng-click=\"saveAndNext()\" ng-hide=\"finished\">Save & Continue</button>\n      <button class=\"btn btn-success\" ng-click=\"saveAndQuit()\" ng-show=\"finished\">Save & Finish</button>\n    </div>\n  </div>\n</div>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	angular.module('BettyCropper')
	  .controller('ImageCropModalCtrl',
	    ['$scope', '$timeout', '$modalInstance', 'BettyCropper', 'Selection', 'DEFAULT_IMAGE_WIDTH', 'imageData', 'ratios',
	    function ($scope, $timeout, $modalInstance, BettyCropper, Selection, DEFAULT_IMAGE_WIDTH, imageData, ratios) {

	      $scope.selectedCrop = null;
	      $scope.cropMode = false;
	      $scope.ratios = ratios;
	      $scope.finished = false;
	      $scope.thumb_container_styles = {};
	      $scope.imageData = imageData;

	      if (!$scope.image) {
	        $scope.image = null;
	        BettyCropper.get(imageData.id).then(function (success) {
	          $scope.image = success.data;
	        });
	      }

	      $scope.$watch('image', function (image) {
	        if (!image) {
	          return;
	        }

	        var finished = true;
	        for (var ratio in image.selections) {
	          if (image.selections[ratio].source === 'auto') {
	            finished = false;
	            break;
	          }
	        }
	        $scope.finished = finished;

	        $scope.scaleData = image.scaleToFit(550, 400);

	        $('.crop-image-container img').one('load', function () {
	          $(this).Jcrop({
	            allowSelect: false,
	            allowMove: true,
	            allowResize: true,
	            keySupport: false
	          }, function () {
	            $scope.jcrop_api = this;
	          });
	        });

	        $scope.image_url = image.url('original', DEFAULT_IMAGE_WIDTH, 'jpg');
	        if (!$scope.ratios) {
	          $scope.ratios = Object.keys(image.selections);
	        }

	        $scope.setThumbStyles();
	      });

	      $scope.$watch('selectedCrop', function (crop) {
	        if (!$scope.image) {
	          return;
	        }
	        var finished = true;
	        for (var ratio in $scope.image.selections) {
	          if ($scope.image.selections[ratio].source === 'auto' && ratio !== crop) {
	            finished = false;
	            break;
	          }
	        }
	        $scope.finished = finished;
	      });

	      $scope.selectCrop = function (ratio) {
	        if (!ratio) {
	          ratio = Object.keys($scope.image.selections)[0];
	          for (var key in $scope.image.selections) {
	            if ($scope.image.selections[key].source === 'auto') {
	              ratio = key;
	              break;
	            }
	          }
	        }
	        var selection = $scope.image.selections[ratio].scaleBy($scope.scaleData.scale);

	        $scope.jcrop_api.setOptions({
	          aspectRatio: selection.width() / selection.height()
	        });

	        $scope.jcrop_api.setSelect([
	          selection.x0,
	          selection.y0,
	          selection.x1,
	          selection.y1
	        ]);

	        $scope.cropMode = true;
	        $scope.selectedCrop = ratio;
	      };

	      $scope.setThumbStyles = function () {
	        $scope.thumb_styles = $scope.thumb_styles || {};

	        for (var ratio in $scope.image.selections) {
	          var scaledSelection = $scope.image.selections[ratio].scaleToFit(170, 170);
	          $scope.thumb_container_styles[ratio] = {
	            'padding-top': Math.round((180 - scaledSelection.height()) / 2) + 'px',
	            'padding-bottom': '5px',
	            'padding-left': Math.round((180 - scaledSelection.width()) / 2) + 'px',
	            'padding-right': '5px'
	          };

	          $scope.thumb_styles[ratio] = $scope.image.getStyles(170, 170, ratio);
	        }
	      };

	      $scope.save = function (ratio) {

	        var jcrop_selection = $scope.jcrop_api.tellSelect();

	        var newSelection = new Selection({
	          x0: jcrop_selection.x,
	          x1: jcrop_selection.x2,
	          y0: jcrop_selection.y,
	          y1: jcrop_selection.y2,
	          source: 'user'
	        });
	        newSelection = newSelection.scaleBy(1 / $scope.scaleData.scale);
	        if (newSelection.x1 > $scope.image.width) {
	          newSelection.x1 = $scope.image.width;
	        }
	        if (newSelection.y1 > $scope.image.height) {
	          newSelection.y1 = $scope.image.height;
	        }

	        return this.image.updateSelection(ratio, newSelection);
	      };

	      $scope.saveAndQuit = function () {
	        var ratio = $scope.selectedCrop;
	        this.save(ratio).then(function (success) {
	          var ratio = success.data[0];
	          var selection = success.data[1];
	          $scope.image.selections[ratio] = selection;
	        });
	        $scope.cropMode = false;

	        $scope.closeModal();
	      };

	      $scope.saveAndNext = function () {
	        var ratio = $scope.selectedCrop;
	        this.save(ratio).then(function (success) {
	          var ratio = success.data[0];
	          var selection = success.data[1];
	          $scope.image.selections[ratio] = selection;

	          var nextRatioIndex = ($scope.ratios.indexOf(ratio) + 1) % $scope.ratios.length;

	          $scope.selectCrop($scope.ratios[nextRatioIndex]);
	        });
	      };

	      $scope.closeModal = function () {
	        $modalInstance.dismiss('cancel');
	      };

	    }]);


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	angular.module('BettyCropper')
	  .factory('openImageCropModal', ['$modal', function ($modal) {
	    var openImageCropModal = function (imageData, ratios) {
	      return $modal.open({
	        templateUrl: 'components/betty-cropper/image-crop-modal.html',
	        controller: 'ImageCropModalCtrl',
	        resolve: {
	          imageData: function () { return imageData; },
	          ratios: function () { return ratios || false; }
	        },
	        backdrop: 'static'
	      }).result;
	    };

	    return openImageCropModal;
	  }]);


/***/ },
/* 18 */
/***/ function(module, exports) {

	var path = 'components/cms-button/cms-button.html';
	var html = "<button class=\"{{type}}-action\">\n  <i ng-hide=\"noglyph\" class=\"fa fa-{{glyph}}\"></i>\n  <ng-transclude></ng-transclude>\n</button>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsButton', function () {

	    return {
	      templateUrl: 'components/cms-button/cms-button.html',
	      restrict: 'EA',
	      transclude: true,
	      scope: {
	        glyph: '@',
	        type: '@',
	        glyphsize: '@',
	        glyphpos: '@',
	        noglyph: '@'
	      },
	      link: function ($scope, element, attrs) {
	        attrs.type  || (attrs.type = 'friendly');
	        attrs.glyph || (attrs.glyph = 'question-circle');
	        attrs.glyphsize || (attrs.glyphsize = 'lg');
	        attrs.glyphpos || (attrs.glyphpos = 'before');
	        if (attrs.noglyph !== undefined) {
	          attrs.noglyph = 'noglyph';
	        }
	      }
	    }
	  });


/***/ },
/* 20 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 21 */,
/* 22 */
/***/ function(module, exports) {

	var path = 'components/cms-component/cms-component.html';
	var html = "<span>Calling from cms-component</span>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsComponent', ['$compile', function ($compile) {
	    return {
	      template: '',
	      restrict: 'E',
	      compile: function (element, attrs) {
	        return {
	          pre: function ($scope, $element, $attrs) {
	            $element.append(document.createElement(attrs.tag));
	            $compile($element.contents())($scope);
	          }
	        };
	      }
	    }
	  }]);


/***/ },
/* 24 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 25 */,
/* 26 */
/***/ function(module, exports) {

	var path = 'components/cms-container/cms-container.html';
	var html = "<ng-transclude></ng-transclude>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsContainer', function () {
	    return {
	      templateUrl: 'components/cms-container/cms-container.html',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 29 */,
/* 30 */
/***/ function(module, exports) {

	var path = 'components/cms-content-list/cms-content-list.html';
	var html = "<cms-container>\n  <cms-partial template=\"status-filters\"></cms-partial>\n  <cms-partial template=\"search-filters\"></cms-partial>\n  <cms-partial template=\"list-table\"></cms-partial>\n</cms-container>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsContentList', function () {
	    return {
	      templateUrl: 'components/cms-content-list/cms-content-list.html',
	      restrict: 'E'
	    };
	  });


/***/ },
/* 32 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 33 */,
/* 34 */
/***/ function(module, exports) {

	var path = 'components/cms-filter-item/cms-filter-item.html';
	var html = "<ng-transclude></ng-transclude>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsFilterItem', function () {
	    return {
	      templateUrl: 'components/cms-filter-item/cms-filter-item.html',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 36 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 37 */,
/* 38 */
/***/ function(module, exports) {

	var path = 'components/cms-filter-set/cms-filter-set.html';
	var html = "<ng-transclude></ng-transclude>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsFilterSet', function () {
	    return {
	      templateUrl: 'components/cms-filter-set/cms-filter-set.html',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 40 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 41 */,
/* 42 */
/***/ function(module, exports) {

	var path = 'components/cms-flyout/cms-flyout.html';
	var html = "<ng-transclude></ng-transclude>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsFlyout', function () {
	    return {
	      templateUrl: 'components/cms-flyout/cms-flyout.html',
	      restrict: 'E',
	      transclude: true,

	      controller: ['$scope', '$element', '$document',
	        function ($scope, $element, $document) {
	          var active = false;
	          var activeClass = 'cms-flyout-active';
	          $scope.$on
	          function toggleActive (event) {
	            // don't close if clicking on the panel
	            if ($(event.target).closest('cms-flyout-panel')[0]) {
	              return;
	            }

	            active = !active;
	            if (active) {
	              $element.addClass(activeClass)
	              setTimeout(function () {
	                $document.bind('click', toggleActive);
	              });
	            }
	            else {
	              $element.removeClass(activeClass);
	              $document.unbind('click', toggleActive);
	            }
	          }
	          $element.on('click', '[cms-flyout-trigger]', toggleActive);
	          $scope.$on('flyout-close', function (event) {
	            event.stopPropagation();
	            if (active) {
	              toggleActive(event);
	            }
	          });

	          // do close if navigating
	          $scope.$on('$locationChangeStart', function(event, next, current) {
	            if (active) { toggleActive(event) };
	          });
	        }]
	    }
	  })
	  .directive('cmsFlyoutTrigger', function () {
	    return {
	      restrict: 'A',
	      controller: ['$scope', function ($scope) {
	      }]
	    };
	  })
	;


/***/ },
/* 44 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 45 */,
/* 46 */
/***/ function(module, exports) {

	var path = 'components/cms-input/cms-input.html';
	var html = "<label>\n  <span class=\"cms-input-title\">\n    {{title}}\n  </span>\n  <span class=\"cms-input-control\">\n    <ng-transclude></ng-transclude>\n  </span>\n</label>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsInput', function () {
	    return {
	      templateUrl: 'components/cms-input/cms-input.html',
	      restrict: 'E',
	      scope: {
	        title: '@'
	      },
	      transclude: true,
	      controller: ['$scope', '$controller', function ($scope, $controller) {
	      }]
	    }
	  });


/***/ },
/* 48 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 49 */,
/* 50 */
/***/ function(module, exports) {

	var path = 'components/cms-layout/cms-layout.html';
	var html = "<ng-transclude></ng-transclude>\n<section ui-view=\"cmsLayoutViewport\" class='cms-layout-viewport'>\n</section>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsLayout', function () {
	    return {
	      templateUrl: 'components/cms-layout/cms-layout.html',
	      restrict: 'E',
	      transclude: true,
	      controller: function ($scope, CurrentUser) {
	        function setCurrentUser () {
	          $scope.currentUser = CurrentUser.getCurrentUser();
	        }
	        $scope.$on('userchange', setCurrentUser);
	        setCurrentUser();
	      }
	    }
	  });


/***/ },
/* 52 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 53 */,
/* 54 */,
/* 55 */
/***/ function(module, exports) {

	var path = 'components/cms-legend/cms-legend.html';
	var html = "<cms-row>\n  <hr/>\n  <ng-transclude class='cms-legend-text'></ng-transclude>\n  <hr/>\n</cms-row>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsLegend', function () {
	    return {
	      templateUrl: 'components/cms-legend/cms-legend.html',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 57 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 58 */,
/* 59 */
/***/ function(module, exports) {

	var path = 'components/cms-login/login.html';
	var html = "<div class=\"login-container\">\n  <div class=\"login-form\">\n    <p class=\"text-center welcome-text\">Welcome</p>\n    <form>\n      <div class=\"login-input username\">\n        <label>Username</label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"username\" required>\n        <div class=\"alert alert-danger required-label\" ng-class=\"submitted\">Required</div>\n      </div>\n      <div class=\"login-input password\">\n        <label>Password</label>\n        <input type=\"password\" class=\"form-control\" ng-model=\"password\" required>\n        <div class=\"alert alert-danger required-label\" ng-class=\"submitted\">Required</div>\n      </div>\n      <alertbar></alertbar>\n      <button class=\"btn add-btn btn-success\" type=\"submit\" ng-click=\"submitLogin()\">\n        <span>Sign in</span>\n      </button>\n    </form>\n    <a class=\"contact\" href=\"mailto:webtech@theonion.com\">\n      <div class=\"question-mark\">?</div>\n      <div class=\"contact-tech\">Contact Tech</div>\n    </a>\n  </div>\n</div>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	.directive('cmsLogin', function () {
	  return {
	    restrict: 'E',
	    templateUrl: 'components/cms-login/login.html',
	    controller: ['$scope', '$location', 'authService', 'CurrentUser', 'BettyService',
	    function ($scope, $location, authService, CurrentUser, BettyService) {

	      $scope.init = function () {
	        $scope.username = '';
	        $scope.password = '';
	        $scope.submitted = '';
	      };

	      $scope.submitLogin = function () {
	        $scope.submitted = 'submitted';
	        if (!_.isEmpty($scope.username) && !_.isEmpty($scope.password)) {
	          authService.login($scope.username, $scope.password)
	            .then($scope.userLoggedIn);
	        }
	      };

	      $scope.userLoggedIn = function () {
	        CurrentUser.setCurrentUser($scope.username);
	        BettyService.updateBettyConfig();
	        $location.path('/');
	      };

	      $scope.init();
	    }]
	  }
	});


/***/ },
/* 61 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 62 */,
/* 63 */
/***/ function(module, exports) {

	var path = 'components/cms-logout/logout.html';
	var html = "";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	.directive('cmsLogout', function () {
	  return {
	    restrict: 'E',
	    templateUrl: 'components/cms-logout/logout.html',
	    controller: ['$scope', '$state', 'authService', 'CurrentUser', 'BettyService',
	    function ($scope, $state, authService, CurrentUser, BettyService) {
	      CurrentUser.setCurrentUser(null);
	      authService.logout();
	      BettyService.updateBettyConfig();
	      $state.go('login');
	    }]
	  }
	});


/***/ },
/* 65 */
/***/ function(module, exports) {

	var path = 'components/cms-partial/cms-partial.html';
	var html = "<span>Calling from cms-partial</span>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsPartial', ['$templateCache', '$compile',
	  function ($templateCache, $compile) {
	    return {
	      restrict: 'E',
	      compile: function (element, attrs) {
	        return {
	          post: function ($scope, $element, $attrs) {
	            $element[0].innerHTML = $templateCache.resolve({
	              path: $attrs.template,
	              component: $scope.component
	            });
	            $compile($element.contents())($scope);
	          }
	        };
	      }
	    }
	  }]);


/***/ },
/* 67 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 68 */,
/* 69 */
/***/ function(module, exports) {

	var path = 'components/cms-row/cms-row.html';
	var html = "<span>Calling from cms-row</span>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsRow', function () {
	    return {
	      //templateUrl: 'components/cms-row/cms-row.html',
	      template: '<ng-transclude></ng-transclude>',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 71 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 72 */,
/* 73 */
/***/ function(module, exports) {

	var path = 'components/cms-table-cell/cms-table-cell.html';
	var html = "";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsTableCell', function ($compile) {
	    return {
	      templateUrl: 'components/cms-table-cell/cms-table-cell.html',
	      restrict: 'A',
	      scope: {
	        column: '=',
	        item: '=',
	        text: '='
	      },
	      compile: function (element, attributes) {
	        return {
	          pre: function ($scope, $element, $attributes) {
	            // first child is ng-transclude, we don't want that here
	            $element.append($scope.column.children[0].innerHTML);
	            $compile($element.contents())($scope);
	          }
	        };
	      }
	    }
	  });


/***/ },
/* 75 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 76 */,
/* 77 */
/***/ function(module, exports) {

	var path = 'components/cms-table-column/cms-table-column.html';
	var html = "<ng-transclude></ng-transclude>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 78 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsTableColumn', function () {
	    return {
	      templateUrl: 'components/cms-table-column/cms-table-column.html',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 79 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 80 */,
/* 81 */
/***/ function(module, exports) {

	var path = 'components/cms-table/cms-table.html';
	var html = "<ng-transclude></ng-transclude>\n<div class=\"cms-table-table\">\n  <div class=\"cms-table-row cms-table-header\">\n    <div class=\"cms-table-cell\" ng-repeat=\"column in columns\"\n         type=\"{{column.attributes.type.value}}\">\n      <a ng-click=\"$parent.$parent.orderTable(column.attributes.sort.value)\">\n        {{column.attributes.title.value}}\n        <i class=\"fa\"\n           ng-class=\"{'fa-chevron-down': $parent.$parent.listOrdering === '-'+column.attributes.sort.value, 'fa-chevron-up': $parent.$parent.listOrdering === column.attributes.sort.value}\"></i>\n      </a>\n    </div>\n  </div>\n\n  <div class=\"cms-table-row\"\n       dir-paginate=\"item in collection | itemsPerPage: 20\"\n       total-items=\"{{collection.$totalCount}}\"\n       current-page=\"$parent.$parent.listPage\">\n    <div class=\"cms-table-cell\" cms-table-cell item=\"item\" column=\"column\" ng-repeat=\"column in columns\"\n         type=\"{{column.attributes.type.value}}\">\n    </div>\n  </div>\n\n  <div class=\"cms-table-blank-slate\" ng-show=\"collection.$status == 'pending'\">\n    <p> Loading items from server... </p>\n  </div>\n\n  <div class=\"cms-table-blank-slate\" ng-hide=\"collection.length\">\n    <p> No items to show in this list. </p>\n  </div>\n</div>\n\n<div class=\"cms-table-pagination\">\n  <dir-pagination-controls on-page-change=\"$parent.$parent.paginate(newPageNumber)\"></dir-pagination-controls>\n</div>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsTable', function () {
	    return {
	      templateUrl: 'components/cms-table/cms-table.html',
	      restrict: 'E',
	      transclude: true,
	      scope: {
	        collection: '='
	      },
	      link: function ($scope, $element, $attrs) {
	        $element.find('cms-table-column').each(function (index, column) {
	          $scope.columns.push($(column).clone()[0]);
	        });
	      },
	      controller: function ($scope) {
	        $scope.columns = [];
	      }
	    }
	  });


/***/ },
/* 83 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 84 */,
/* 85 */
/***/ function(module, exports) {

	var path = 'components/sidebar-nav-item/sidebar-nav-item.html';
	var html = "<a ng-transclude ui-sref=\"{{sref}}\"></a>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('sidebarNavItem', function () {
	    return {
	      templateUrl: 'components/sidebar-nav-item/sidebar-nav-item.html',
	      restrict: 'E',
	      scope: {
	        'sref': '@'
	      },
	      transclude: true
	    }
	  });


/***/ },
/* 87 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 88 */,
/* 89 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('uiSrefActiveIf', ['$state', function($state) {
	    return {
	        restrict: "A",
	        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
	            var state = $attrs.uiSrefActiveIf;

	            function update() {
	                if ( $state.includes(state) || $state.is(state) ) {
	                    $element.addClass("active");
	                } else {
	                    $element.removeClass("active");
	                }
	            }

	            $scope.$on('$stateChangeSuccess', update);
	            update();
	        }]
	    };
	}])


/***/ },
/* 90 */
/***/ function(module, exports) {

	var path = 'components/user-menu/user-menu.html';
	var html = "<div class=\"dropdown\">\n  <button ng-if=\"currentUser\" type=\"button\" class=\"user-menu-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n    <user-profile></user-profile>\n    <i class=\"user-menu-icon fa fa-ellipsis-v fa-2x\"></i>\n  </button>\n  <ul class=\"dropdown-menu user-menu-dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n    <li><a ui-sref=\"logout\">Log Out</a></li>\n  </ul>\n</div>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('userMenu', function () {
	    return {
	      templateUrl: 'components/user-menu/user-menu.html',
	      restrict: 'E',
	      controller: function ($scope, CurrentUser) {
	        function setCurrentUser () {
	          $scope.currentUser = CurrentUser.getCurrentUser();
	          console.log('setCurrentUser in user-menu', $scope.currentUser);
	        }
	        $scope.$on('userchange', setCurrentUser);
	        setCurrentUser();
	      }
	    }
	  });


/***/ },
/* 92 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 93 */,
/* 94 */
/***/ function(module, exports) {

	var path = 'components/user-profile/user-profile.html';
	var html = "<span style=\"background-color: {{userColor}};\">{{initials}}</span>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('userProfile', function () {
	    return {
	      templateUrl: 'components/user-profile/user-profile.html',
	      restrict: 'E',
	      controller: ['$scope', 'CurrentUser', 'md5', function ($scope, currentUser, md5) {
	        $scope.setUser = function () {
	          $scope.currentUser = currentUser.getCurrentUser();
	          if ($scope.currentUser) {
	            $scope.initials = currentUser.getCurrentUser().slice(0, 2);

	            var hash = md5.createHash($scope.currentUser);
	            var rgb = '#' + hash.substring(0,2) + hash.substring(2,4) + hash.substring(4,6);
	            $scope.userColor = rgb;
	          }
	          else {
	            $scope.currentUser = null;
	            $scope.userColor = null;
	            $scope.initials = null;
	          }
	        };
	        $scope.$on('userchange', $scope.setUser);
	        $scope.setUser();
	      }]
	    }
	  });


/***/ },
/* 96 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);