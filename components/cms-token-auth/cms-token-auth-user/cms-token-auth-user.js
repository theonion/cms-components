'use strict';

angular.module('cmsComponents.auth.user', [])
  .service('CurrentUser', [
    '$q',
    function ($q) {

      return {
        $get: function () {
// TODO : make a request to get the current user's info
          return $q.resolve();
        },
        logout: function () {
// TODO : remove user data
        }
      };
    }
  ]);
