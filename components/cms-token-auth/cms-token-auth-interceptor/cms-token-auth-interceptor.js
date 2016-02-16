'use strict';

angular.module('cmsComponents.auth.interceptor', [
  'cmsComponents.auth.service',
  'cmsComponents.auth.config',
  'LocalStorageModule'
])
  .service('TokenAuthInterceptor', [
    '$injector', '$q', '$templateCache', 'localStorageService', 'TokenAuthConfig',
    function ($injector, $q, $templateCache, localStorageService, TokenAuthConfig) {

      var doIgnoreAuth = function (config) {
        return Boolean(!config || config.ignoreTokenAuth);
      };

      var isTemplateRequest = function (config) {
        return config &&
            config.method === 'GET' &&
            typeof $templateCache.get(config.url) !== 'undefined';
      };

      var abortRequest = function (config) {
        var abort = $q.defer();
        config.timeout = abort.promise;
        abort.resolve();
      };

      this.request = function (config) {
        if (!doIgnoreAuth(config) &&
            !isTemplateRequest(config) &&
            TokenAuthConfig.shouldBeIntercepted(config.url)) {

          // get token from storage
          var token = localStorageService.get(TokenAuthConfig.getTokenKey());
          // need to inject service here, otherwise we get a circular $http dep
          var TokenAuthService = $injector.get('TokenAuthService');

          return TokenAuthService.tokenVerify()
            .then(function () {
              // add Authorization header
              config.headers = config.headers || {};
              config.headers.Authorization = 'JWT ' + token;

              return config;
            })
            .catch(function () {
              // verification failed abort request
              abortRequest(config);
              return $q.reject(config);
            });
        }

        // this is a request not being intercepted, just return it
        return config;
      };

      this.responseError = function (response) {
        // only deal with an error if auth module is not ignored, this is a url
        //  to deal with and the response code is unauthorized
        var config = response.config ? response.config : response;

        if (!doIgnoreAuth(config) &&
            TokenAuthConfig.shouldBeIntercepted(config.url) &&
            (!response.status || TokenAuthConfig.isStatusCodeToHandle(response.status))) {

          // need to inject service here, otherwise we get a circular $http dep
          var TokenAuthService = $injector.get('TokenAuthService');

          // append request to buffer to retry later
          TokenAuthService.requestBufferPush(config);

          // attempt to refresh token
          TokenAuthService.tokenRefresh();
        }

        return $q.reject(response);
      };

      return this;
    }
  ]);
