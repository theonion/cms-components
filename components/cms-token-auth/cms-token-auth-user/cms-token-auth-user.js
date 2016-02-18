'use strict';

angular.module('cmsComponents.auth.user', [
  'cmsComponents.auth.config'
])
  .service('CurrentUser', [
    '$http', '$q', 'TokenAuthConfig',
    function ($http, $q, TokenAuthConfig) {
      var data = {
        user: null
      };

      var handlers = {
        login: [],
        logout: []
      };

      var lastRequest = null;
      var lastLogout = null;

      return {
        $get: function () {
          if (!lastRequest) {
            lastRequest = $http.get(TokenAuthConfig.getApiEndpointCurrentUser())
              .then(function (response) {
                data.user = response.data;

                lastLogout = null;
                handlers.login.forEach(function (handler) {
                  handler(data.user);
                });

                return data.user;
              })
              .catch(function (error) {
                lastRequest = null;
                return $q.reject(error);
              });
          }

          return lastRequest;
        },
        addLoginHandler: function (func) {
          handlers.login.push(func);

          if (lastRequest) {
            lastRequest.then(func);
          }
        },
        addLogoutHandler: function (func) {
          handlers.logout.push(func);

          if (lastLogout) {
            lastLogout.then(func);
          }
        },
        removeLoginHandler: function (func) {
          var index = handlers.login.indexOf(func);
          if (index >= 0) {
            handlers.login.splice(index, 1);
          }
        },
        removeLogoutHandler: function (func) {
          var index = handlers.logout.indexOf(func);
          if (index >= 0) {
            handlers.logout.splice(index, 1);
          }
        },
        logout: function () {
          if (!lastLogout) {
            lastLogout = $q.resolve();

            data.user = null;

            lastRequest = null;
            handlers.logout.forEach(function (handler) {
              handler();
            });
          }

          return lastLogout;
        }
      };
    }
  ]);
