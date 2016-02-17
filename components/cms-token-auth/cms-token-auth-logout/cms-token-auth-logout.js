'use strict';

angular.module('cmsComponents.auth.logout', [
  'cmsComponents.auth.service'
])
  .directive('cmsTokenAuthLogout', [
    function () {
      return {
        restrict: 'E',
        controller: [
          'TokenAuthService',
          function (TokenAuthService) {
            TokenAuthService.logout();
          }
        ]
      }
    }
  ]);
