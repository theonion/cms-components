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

      // false if not verified at least once, otherwise promise that resolves when
      //  verification endpoint returns
      var $verified = false;

      TokenAuthService._requestBuffer = [];

      /**
       * Force verification promise to be resolved. Used whenever an endpoint
       *  besides the verify endpoint has been used to successfully authenticate.
       */
      var forceAuthenticated = function () {
        if (!$verified) {
          $verified = $q.defer();
        }

        $verified.resolve();
      };

      /**
       * Force verification promise to be rejected. Used whenever an endpoint
       *  besides the verify endpoint has been used to unauthenticate.
       */
      var forceUnauthenticated = function () {
        if (!$verified) {
          $verified = $q.defer();
        }

        $verified.reject();
      };

      var authSuccess = function (deferred) {
        return function () {
          return CurrentUser.$get()
            .then(function (user) {
              TokenAuthService.requestBufferRetry();

              TokenAuthConfig.callAuthSuccessHandlers(user);

              forceAuthenticated();
              deferred.resolve();
            })
            .catch(deferred.reject);
        };
      };

      var loginAuthSuccess = function (deferred) {
        return function (loginResponse) {
            return CurrentUser.$get()
              .then(function (user) {
                localStorageService.set(TokenAuthConfig.getTokenKey(), loginResponse.data.token);

                TokenAuthConfig.callAuthSuccessHandlers(user);

                forceAuthenticated();
                deferred.resolve();
              })
              .catch(deferred.reject);
        };
      };

      var noTokenFailure = function () {
        forceUnauthenticated();
        TokenAuthService.requestBufferClear();
        CurrentUser.logout();
        TokenAuthConfig.callAuthFailureHandlers();
      };

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
        if ($verified) {
          // already verified, return existing verification
          return $verified;
        }

        if (requestInProgress) {
          // there's already an auth request going, reject
          return $q.reject();
        }

        // no currently running request, start a new one
        requestInProgress = true;

        // verify has not been called yet, set it up
        $verified = $q.defer();

        var token = localStorageService.get(TokenAuthConfig.getTokenKey());
        if (token) {
          $http.post(
            TokenAuthConfig.getApiEndpointVerify(),
            {
              token: token
            },
            {
              ignoreTokenAuth: true
            }
          )
          .then(authSuccess($verified))
          .catch(function (response) {

            if (response.status === 400) {
              // this is an expired token, attempt refresh
              requestInProgress = false;
              TokenAuthService.tokenRefresh()
                .then($verified.resolve)
                .catch($verified.reject);
            } else if (TokenAuthConfig.isStatusCodeToHandle(response.status)) {
              // user is not authorized, special failure
              // side-effect: reject $verified, this can probably be done better
              noTokenFailure();
            } else {
              // this is not an auth error, reject verification
              $verified.reject();
            }
          });
        } else {
          // side-effect: reject $verified, this can probably be done better
          noTokenFailure();
        }

        return $verified.promise
          .finally(function () {
            // reset request flag so other requests can go through
            requestInProgress = false;
          });
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

        // no currently running request, start a new one
        requestInProgress = true;

        var refresh = $q.defer();
        var token = localStorageService.get(TokenAuthConfig.getTokenKey());
        if (token) {
          $http.post(
            TokenAuthConfig.getApiEndpointRefresh(),
            {
              token: token
            },
            {
              ignoreTokenAuth: true
            }
          )
            .success(refresh.resolve)
            .catch(refresh.reject);
        } else {
          refresh.reject();
        }

        return refresh.promise
          .then(authSuccess(refresh))
          .catch(function (error) {
            noTokenFailure();

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

        var login = $q.defer();
        $http.post(
          TokenAuthConfig.getApiEndpointAuth(),
          {
            username: username,
            password: password
          },
          {
            ignoreTokenAuth: true
          }
        )
          .then(login.resolve)
          .catch(login.reject);

        return login.promise
          .then(loginAuthSuccess(login))
          .catch(function (error) {
            forceUnauthenticated();
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
        forceUnauthenticated();
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
                abort.resolve();
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
