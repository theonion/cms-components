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

      return {
        $get: function () {
          if (!lastRequest) {
            lastRequest = $http.get(TokenAuthConfig.getApiEndpointCurrentUser())
              .then(function (response) {
                data.user = response.data;

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
        },
        addLogoutHandler: function (func) {
          handlers.logout.push(func);
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
          lastRequest = null;

          data.user = null;

          handlers.logout.forEach(function (handler) {
            handler();
          });
        }
      };
    }
  ]);
