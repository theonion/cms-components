'use strict';

angular.module('cmsComponents.navUser', [
  'cmsComponents.auth.user',
  'cmsComponents.filters.userDisplay'
])
  .directive('cmsNavUser', function () {
    return {
      templateUrl: 'components/cms-nav-user/cms-nav-user.html',
      restrict: 'E',
      controller: [
        '$rootScope', '$scope', 'CurrentUser',
        function ($rootScope, $scope, CurrentUser) {

          var onLogin = function (user) {
            $scope.user = user;
          };

          var onLogout = function () {
            $scope.user = null;
          };

          CurrentUser.addLoginHandler(onLogin);
          CurrentUser.addLogoutHandler(onLogout);

          $scope.$on('$destroy', function () {
            CurrentUser.removeLoginHandler(onLogin);
            CurrentUser.removeLogoutHandler(onLogout);
          });
        }
      ]
    }
  });
