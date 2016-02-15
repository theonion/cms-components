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

      var verification = (function () {
        var defer = null;

        return {
          build: function () {
            defer = $q.defer();

            return this.promise();
          },
          exists: function () {
            return defer !== null;
          },
          promise: function () {
            return defer.promise;
          },
          resolve: function (success) {
            if (!this.exists()) {
              this.build();
            }

            defer.resolve(success);

            return this.promise();
          },
          reject: function (error) {
            if (!this.exists()) {
              this.build();
            }

            defer.reject(error)

            return this.promise();
          },
          rejectAndClear: function (error) {
            TokenAuthService.requestBufferClear();
            CurrentUser.logout();

            TokenAuthConfig.callAuthFailureHandlers();

            return this.reject(error);
          }
        }
      } ());

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
        if (verification.exists()) {
          // already verified, return existing verification
          return verification.promise();
        }

        if (requestInProgress) {
          // there's already an auth request going, reject verification
          return verification.reject();
        }

        var token = localStorageService.get(TokenAuthConfig.getTokenKey());
        if (!token) {
          // no token in storage, reject verification
          return verification.rejectAndClear('session expired');
        }

        // no currently running request, start a new one
        requestInProgress = true;

        verification.build();

        $http.post(
          TokenAuthConfig.getApiEndpointVerify(),
          {
            token: token
          },
          {
            ignoreTokenAuth: true
          }
        )
          .then(function () {
            return CurrentUser.$get()
              .then(function (user) {
                TokenAuthService.requestBufferRetry();

                TokenAuthConfig.callAuthSuccessHandlers(user);

                return verification.resolve();
              });
          })
          .catch(function (response) {
            var promise;

            if (response.status === 400) {
              // this is an expired token, attempt refresh
              requestInProgress = false;
              promise = TokenAuthService.tokenRefresh();
            } else if (TokenAuthConfig.isStatusCodeToHandle(response.status)) {
              // user is not authorized, reject everything, user needs to login
              promise = verification.rejectAndClear();
            } else {
              // this is not an auth error, reject verification
              promise = verification.reject();
            }

            return promise;
          });

        return verification.promise()
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

        var token = localStorageService.get(TokenAuthConfig.getTokenKey());
        if (!token) {
          // no token in storage, reject
          return verification.rejectAndClear('session expired');
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
          .then(function () {
            return CurrentUser.$get()
              .then(function (user) {
                TokenAuthService.requestBufferRetry();

                TokenAuthConfig.callAuthSuccessHandlers(user);

                return verification.resolve();
              });
          })
          .catch(function (error) {
            return verification.rejectAndClear(error);
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
          .then(function (loginResponse) {
            return CurrentUser.$get()
              .then(function (user) {
                localStorageService.set(TokenAuthConfig.getTokenKey(), loginResponse.data.token);

                TokenAuthConfig.callAuthSuccessHandlers(user);

                return verification.resolve();
              });
          })
          .catch(function (error) {
            CurrentUser.logout();
            TokenAuthConfig.callAuthFailureHandlers();

            return verification.reject(error);
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

        return verification.reject();
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
