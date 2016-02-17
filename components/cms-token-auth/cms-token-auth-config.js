'use strict';

angular.module('cmsComponents.auth.config', [
  'lodash'
])
  .provider('TokenAuthConfig', [
    '_',
    function TokenAuthConfigProvider (_) {
      // page to route to after a successful login
      var afterLoginPath = '/';
      // endpoint for token auth
      var apiEndpointAuth = '/api/token/auth';
      // endpoint for token refresh
      var apiEndpointRefresh = '/api/token/refresh';
      // endpoint for current user data
      var apiEndpointCurrentUser = '/api/me';
      // endpoint for token verification
      var apiEndpointVerify = '/api/token/verify';
      // host where auth endpoints are located
      var apiHost = '';
      // handlers to when an authentication failure occurs
      var authFailureHandlers = [];
      // handlers to fire when authentication succeeds
      var authSuccessHandlers = [];
      // HTTP codes this module should handle
      var handleHttpCodes = [401, 403];
      // path to login page
      var loginPagePath = '';
      // url for logo to display on login page
      var logoUrl = '';
      // list of regular expressions to match request urls, only matched urls will
      //  be intercepted successfully
      var matchers = [/.*/];
      // local storage key for token
      var tokenKey = 'authToken';
      // handlers to fire when unauthentication occurs (logout)
      var unauthHandlers = [];

      this.setAfterLoginPath = function (value) {
        if (_.isString(value)) {
          afterLoginPath = value;
        } else {
          throw new TypeError('TokenAuthConfig.afterLoginPath must be a string!');
        }
      };

      this.setApiEndpointAuth = function (value) {
        if (_.isString(value)) {
          apiEndpointAuth = value;
        } else {
          throw new TypeError('TokenAuthConfig.apiEndpointAuth must be a string!');
        }
      };

      this.setApiEndpointRefresh = function (value) {
        if (_.isString(value)) {
          apiEndpointRefresh = value;
        } else {
          throw new TypeError('TokenAuthConfig.apiEndpointRefresh must be a string!');
        }
      };

      this.setApiEndpointVerify = function (value) {
        if (_.isString(value)) {
          apiEndpointVerify = value;
        } else {
          throw new TypeError('TokenAuthConfig.apiEndpointVerify must be a string!');
        }
      };

      this.setApiEndpointCurrentUser = function (value) {
        if (_.isString(value)) {
          apiEndpointCurrentUser = value;
        } else {
          throw new TypeError('TokenAuthConfig.apiEndpointCurrentUser must be a string!');
        }
      };

      this.setApiHost = function (value) {
        if (_.isString(value)) {
          apiHost = value;
        } else {
          throw new TypeError('TokenAuthConfig.apiHost must be a string!');
        }
      };

      this.setHandleHttpCodes = function (httpCodesList) {
        if (_.isArray(httpCodesList)) {
          // check that all the items are numbers
          _.each(httpCodesList, function (httpCode) {
            if (!_.isNumber(httpCode)) {
              throw new TypeError('TokenAuthConfig.handleHttpCodes must include only Numbers! ' + httpCode + ' is not a Number.');
            }
          });

          handleHttpCodes = httpCodesList;
        } else {
          throw new TypeError('TokenAuthConfig.handleHttpCodes must be an array!');
        }
      };

      this.addAuthFailureHandler = function (func) {
        if (_.isFunction(func)) {
          authFailureHandlers.push(func);
        } else {
          throw new TypeError('TokenAuthConfig.addAuthFailureHandlers can only contain functions!');
        }
      };

      this.addAuthSuccessHandler = function (func) {
        if (_.isFunction(func)) {
          authSuccessHandlers.push(func);
        } else {
          throw new TypeError('TokenAuthConfig.authSuccessHandlers can only contain functions!');
        }
      };

      this.setLoginPagePath = function (value) {
        if (_.isString(value)) {
          loginPagePath = value;
        } else {
          throw new TypeError('TokenAuthConfig.loginPagePath must be a string!');
        }
      };

      this.setLogoUrl = function (value) {
        if (_.isString(value)) {
          logoUrl = value;
        } else {
          throw new TypeError('TokenAuthConfig.logoUrl must be a string!');
        }
      };

      this.setMatchers = function (matcherList) {
        if (_.isArray(matcherList)) {
          // check that all the items are regex
          _.each(matcherList, function (matcher) {
            if (!_.isRegExp(matcher)) {
              throw new TypeError('TokenAuthConfig.matchers must include only RegExp objects! ' + matcher + ' is not a RegExp.');
            }
          });

          matchers = matcherList;
        } else {
          throw new TypeError('TokenAuthConfig.matchers must be an array!');
        }
      };

      this.setTokenKey = function (value) {
        if (_.isString(value)) {
          tokenKey = value;
        } else {
          throw new TypeError('TokenAuthConfig.tokenKey must be a string!');
        }
      };

      this.addUnauthHandler = function (func) {
        if (_.isFunction(func)) {
          unauthHandlers.push(func);
        } else {
          throw new TypeError('TokenAuthConfig.unauthHandlers can only contain functions!');
        }
      };

      this.$get = function () {
        return {
          getAfterLoginPath: _.constant(afterLoginPath),
          getApiEndpointAuth: _.constant(apiHost + apiEndpointAuth),
          getApiEndpointRefresh: _.constant(apiHost + apiEndpointRefresh),
          getApiEndpointCurrentUser: _.constant(apiHost + apiEndpointCurrentUser),
          getApiEndpointVerify: _.constant(apiHost + apiEndpointVerify),
          getLoginPagePath: _.constant(loginPagePath),
          getLogoUrl: _.constant(logoUrl),
          getTokenKey: _.constant(tokenKey),
          callAuthFailureHandlers: function (args) {
            if (!_.isArray(args)) {
              args = [args];
            }

            authFailureHandlers.forEach(function (handler) {
              handler.apply(null, args);
            });
          },
          callAuthSuccessHandlers: function (args) {
            if (!_.isArray(args)) {
              args = [args];
            }

            authSuccessHandlers.forEach(function (handler) {
              handler.apply(null, args);
            });
          },
          callUnauthHandlers: function (args) {
            if (!_.isArray(args)) {
              args = [args];
            }

            unauthHandlers.forEach(function (handler) {
              handler.apply(null, args);
            });
          },
          /**
           * Check if this an HTTP status code this library should handle.
           *
           * @param {number} httpCode - HTTP code to test.
           * @returns {boolean} true if HTTP code indicates something to handle,
           *    false otherwise.
           */
          isStatusCodeToHandle: function (httpCode) {
            return _.includes(handleHttpCodes, httpCode);
          },
          /**
           * Check if a url is a token auth url.
           *
           * @param {string} url - Url to test against token auth urls.
           * @returns {boolean} true if url should be intercepted, false otherwise.
           */
          isTokenAuthUrl: function (url) {
            return url.search(this.getApiEndpointAuth()) ||
              url.search(this.getApiEndpointVerify()) ||
              url.search(this.getApiEndpointRefresh());
          },
          /**
           * Check if a given url should be intercepted by this library's interceptor.
           *
           * @param {string} url - Url to test against matchers.
           * @returns {boolean} true if url should be intercepted, false otherwise.
           */
          shouldBeIntercepted: function (url) {
            return _.chain(matchers)
              .find(function (regex) {
                return regex.test(url);
              })
              .isRegExp()
              .value();
          }
       };
      };
    }
  ]);
