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

      return {
        $get: function () {
          if (data.user === null) {
            return $http.get(TokenAuthConfig.getApiEndpointCurrentUser())
              .then(function (response) {
                data.user = response.data.results[0];

                handlers.login.forEach(function (handler) {
                  handler(data.user);
                });

                return data.user;
              });
          }

          return $q.resolve(data.user);
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
          data.user = null;

          handlers.logout.forEach(function (handler) {
            handler();
          });
        }
      };
    }
  ]);
