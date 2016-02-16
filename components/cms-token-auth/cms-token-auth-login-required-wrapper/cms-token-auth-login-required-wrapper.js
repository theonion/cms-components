'use strict';

angular.module('cmsComponents.auth.loginRequiredWrapper', [
  'cmsComponents.auth.user'
])
  .directive('cmsLoginRequiredWrapper', [
    function () {
      return {
        template: '<ng-transclude ng-if="currentUser"></ng-transclude>',
        restrict: 'E',
        transclude: true,
        controller: [
          '$scope', 'CurrentUser',
          function ($scope, CurrentUser) {
            CurrentUser.$get();

            CurrentUser.addLoginHandler(function (user) {
              $scope.currentUser = user;
            });

            CurrentUser.addLogoutHandler(function () {
              $scope.currentUser = null;
            });
          }
        ]
      }
    }
  ]);
