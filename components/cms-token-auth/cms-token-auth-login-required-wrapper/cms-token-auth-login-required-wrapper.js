'use strict';

angular.module('cmsComponents.auth.loginRequiredWrapper', [
  'cmsComponents.auth.user'
])
  .directive('cmsLoginRequiredWrapper', [
    function () {
      return {
        template: '<ng-transclude ng-if="user"></ng-transclude>',
        restrict: 'E',
        transclude: true,
        controller: [
          '$scope', 'CurrentUser',
          function ($scope, CurrentUser) {
            CurrentUser.$get();

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
    }
  ]);
