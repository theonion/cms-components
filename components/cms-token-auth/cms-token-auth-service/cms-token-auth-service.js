'use strict';

angular.module('cmsComponents.auth.service', [
  'cmsComponents.auth.config',
  'cmsComponents.auth.user',
  'LocalStorageModule'
])
  .service('TokenAuthService', [
    '$q', '$http', 'localStorageService', 'CurrentUser', 'TokenAuthConfig',
    function ($q, $http, localStorageService, CurrentUser, TokenAuthConfig) {

      var TokenAuthService = this;
      var requestInProgress = false;
      var verifiedAtLeastOnce = false;
      var verificationInProgress = false;

      var clearAuth = function () {
        TokenAuthService.requestBufferClear();
        CurrentUser.logout();

        TokenAuthConfig.callAuthFailureHandlers();
      };

      TokenAuthService._requestBuffer = [];

      /**
       * Token verification endpoint. Should be used as the initial request when
       *  a page loads to check if user is authenticated. All requests should be
       *  buffered until verify endpoint returns successfully.
       *
       * Because token verification is meant only to occur once when the page loads,
       *  subsequent calls to this function will return the promise from the original
       *  call.
       *
       * @returns {promise} resolves when authenticated, rejects otherwise.
       */
      TokenAuthService.tokenVerify = function () {

        if (verifiedAtLeastOnce) {
          // we only call this verify endpoint one time
          return $q.resolve();
        }

        if (verificationInProgress) {
          // already doing verification, just return that promise
          return verificationInProgress;
        }

        if (requestInProgress) {
          // there's already an auth request going, reject verification
          return $q.reject();
        }

        var token = localStorageService.get(TokenAuthConfig.getTokenKey());
        if (!token) {
          // no token in storage, reject verification
          clearAuth();
          return $q.reject('session expired');
        }

        // no currently running request, start a new one
        requestInProgress = true;

        verificationInProgress = $http.post(
          TokenAuthConfig.getApiEndpointVerify(),
          {
            token: token
          },
          {
            ignoreTokenAuth: true
          }
        )
          .then(function () {
            verifiedAtLeastOnce = true;
            TokenAuthService.requestBufferRetry();
            return CurrentUser.$get()
              .then(function (user) {
                TokenAuthConfig.callAuthSuccessHandlers(user);
              });
          })
          .catch(function (response) {
            var promise;

            if (response.status === 400) {
              // this is an expired token, attempt refresh
              requestInProgress = false;
              promise = TokenAuthService.tokenRefresh()
                .then(function () {
                  verifiedAtLeastOnce = true;
                });
            } else if (TokenAuthConfig.isStatusCodeToHandle(response.status)) {
              // user is not authorized, reject everything, user needs to login
              clearAuth();
              promise = $q.reject('not authorized');
            } else {
              // this is not an auth error, reject verification
              promise = $q.reject();
            }

            return promise;
          })
          .finally(function () {
            // reset request flag so other requests can go through
            requestInProgress = false;
          });

        return verificationInProgress;
      };

      /**
       * Token refresh endpoint. Should be used for reauthenticating ajax requests
       *  that have responded with an unauthorized status code.
       *
       * @returns {promise} resolves when authenticated, rejects otherwise.
       */
      TokenAuthService.tokenRefresh = function () {
        if (requestInProgress) {
          // there's already an auth request going, reject
          return $q.reject();
        }

        var token = localStorageService.get(TokenAuthConfig.getTokenKey());
        if (!token) {
          // no token in storage, reject
          clearAuth();
          return $q.reject('session expired');
        }

        // no currently running request, start a new one
        requestInProgress = true;

        return $http.post(
          TokenAuthConfig.getApiEndpointRefresh(),
          {
            token: token
          },
          {
            ignoreTokenAuth: true
          }
        )
          .then(function (tokenResponse) {
            localStorageService.set(TokenAuthConfig.getTokenKey(), tokenResponse.data.token);
            verifiedAtLeastOnce = true;
            TokenAuthService.requestBufferRetry();
            return CurrentUser.$get()
              .then(function (user) {
                TokenAuthConfig.callAuthSuccessHandlers(user);
              });
          })
          .catch(function (error) {
            clearAuth();
            return $q.reject(error);
          })
          .finally(function () {
            // reset request flag so other requests can go through
            requestInProgress = false;
          });
      };

      /**
       * Login endpoint. Should only be used where a user is providing a username
       *  and password to login.
       *
       * Makes an additional request to get current user info.
       *
       * Calls TokenAuthConfig.callAuthSuccessHandlers on success, and
       *  TokenAuthConfig.callAuthFailureHandlers on failure.
       *
       * Sets token key in local storage on success.
       *
       * @param {string} username - username to use to login.
       * @param {string} password - password to use to login.
       * @returns {promise} resolves when fully authenticated, rejects otherwise.
       */
      TokenAuthService.login = function (username, password) {
        if (requestInProgress) {
          // there's already an auth request going, reject
          return $q.reject();
        }

        // no currently running request, start a new one
        requestInProgress = true;

        return $http.post(
          TokenAuthConfig.getApiEndpointAuth(),
          {
            username: username,
            password: password
          },
          {
            ignoreTokenAuth: true
          }
        )
          .then(function (tokenResponse) {
            localStorageService.set(TokenAuthConfig.getTokenKey(), tokenResponse.data.token);
            verifiedAtLeastOnce = true;
            return CurrentUser.$get()
              .then(function (user) {
                TokenAuthConfig.callAuthSuccessHandlers(user);
              });
          })
          .catch(function (error) {
            CurrentUser.logout();
            TokenAuthConfig.callAuthFailureHandlers();
            return $q.reject(error);
          })
          .finally(function () {
            // reset request flag so other requests can go through
            requestInProgress = false;
          });
      };

      /**
       * Log user out by removing token from local storage, sends them back to
       *  login page.
       */
      TokenAuthService.logout = function () {
        CurrentUser.logout();
        TokenAuthConfig.callUnauthHandlers();
        localStorageService.remove(TokenAuthConfig.getTokenKey());
      };

      /**
       * Push a request configuration into buffer to be rerun later.
       *
       * @param {object} config - request configuration to be buffered.
       * @returns {object} cloned config object added to the buffer.
       */
      TokenAuthService.requestBufferPush = function (config) {
        var configCopy = _.omit(config, 'timeout');
        TokenAuthService._requestBuffer.push(configCopy);
        return configCopy;
      };

      /**
       * Retry all buffered requests. If any response returns with an
       *  unauthorized status code, all further buffered requests will be aborted.
       *  Clears buffer in every case.
       */
      TokenAuthService.requestBufferRetry = function () {
        var abort = $q.defer();

        _.each(TokenAuthService._requestBuffer, function (config) {
          // hook for canceling requests after a failure
          config.timeout = abort.promise;

          $http(config)
            .catch(function (response) {
              if (TokenAuthConfig.isStatusCodeToHandle(response.status)) {
                // have one failure, abort all other requests
                return abort.resolve();
              }
            });
         });

         TokenAuthService.requestBufferClear();
      };

      /**
       * Remove all request configurations from request buffer.
       */
      TokenAuthService.requestBufferClear = function () {
        TokenAuthService._requestBuffer = [];
      };

      return TokenAuthService;
    }
  ]);
