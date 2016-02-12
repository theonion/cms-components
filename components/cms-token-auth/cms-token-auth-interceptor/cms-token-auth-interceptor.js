'use strict';

angular.module('cmsComponents.auth.interceptor', [
  'cmsComponents.auth.service',
  'cmsComponents.auth.config',
  'LocalStorageModule'
])
  .service('TokenAuthInterceptor', [
    '$injector', '$q', 'localStorageService', 'TokenAuthConfig',
    function ($injector, $q, localStorageService, TokenAuthConfig) {

      var doIgnoreAuth = function (config) {
        return Boolean(!config || config.ignoreTokenAuth);
      };

      var abortRequest = function (config) {
        var abort = $q.defer();
        config.timeout = abort.promise;
        abort.resolve();
      };

      this.request = function (config) {

        if (!doIgnoreAuth(config) && TokenAuthConfig.shouldBeIntercepted(config.url)) {

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
            .catch(function (error) {
              // verification failed abort request
              abortRequest(config);

              return $q.reject(error);
            });
        }

        // this is a request not being intercepted, just return it
        return config;
      };

      this.responseError = function (response) {
        // only deal with an error if auth module is not ignored, this is a url
        //  to deal with and the response code is unauthorized
        if (!doIgnoreAuth(response.config) &&
            TokenAuthConfig.shouldBeIntercepted(response.config.url) &&
            TokenAuthConfig.isStatusCodeToHandle(response.status)) {

          // need to inject service here, otherwise we get a circular $http dep
          var TokenAuthService = $injector.get('TokenAuthService');

          // append request to buffer to retry later
          TokenAuthService.requestBufferPush(response.config);

          // attempt to refresh token
          TokenAuthService.tokenRefresh();
        }

        return $q.reject(response);
      };

      return this;
    }
  ]);
