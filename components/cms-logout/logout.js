'use strict';

angular.module('cmsComponents.logout', [
  'cmsComponents.auth.authService'
])
  .directive('cmsLogout', [
    function () {
      return {
        restrict: 'E',
        templateUrl: 'components/cms-logout/logout.html',
        controller: [
          '$state', 'TokenAuthService', 'CurrentUser', 'BettyService',
          function ($state, TokenAuthService, CurrentUser, BettyService) {

            TokenAuthService.logout();

            CurrentUser.setCurrentUser(null);
            BettyService.updateBettyConfig();
            $state.go('login');
          }
        ]
      }
    }
  ]);
