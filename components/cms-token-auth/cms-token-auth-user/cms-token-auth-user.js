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
                data.user = response.data;

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
        logout: function () {
          data.user = null;

          handlers.logout.forEach(function (handler) {
            handler();
          });
        }
      };
    }
  ]);
