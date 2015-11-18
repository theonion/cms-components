'use strict';

angular.module('cmsComponents')
.directive('cmsLogout', function () {
  return {
    restrict: 'E',
    templateUrl: 'components/cms-logout/logout.html',
    controller: ['$scope', '$state', 'authService', 'CurrentUser', 'BettyService',
    function ($scope, $state, authService, CurrentUser, BettyService) {
      CurrentUser.setCurrentUser(null);
      authService.logout();
      BettyService.updateBettyConfig();
      $state.go('login');
    }]
  }
});
