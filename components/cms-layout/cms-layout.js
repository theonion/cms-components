'use strict';

angular.module('cmsComponents.cmsLayout', [
  'cmsComponents.auth.user'
])
  .directive('cmsLayout', [
    function () {
      return {
        templateUrl: 'components/cms-layout/cms-layout.html',
        restrict: 'E',
        transclude: true,
        controller: [
          '$scope', 'CurrentUser',
          function ($scope, CurrentUser) {
            CurrentUser.$get()
              .then(function (user) {
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
