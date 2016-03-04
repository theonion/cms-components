'use strict';

angular.module('cmsComponents.navUser', [
  'cmsComponents.auth.user',
  'cmsComponents.auth.loginRequiredWrapper',
  'cmsComponents.filters.userDisplay',
  'cmsComponents.templates'
])
  .directive('cmsNavUser', [
    function () {
      return {
        templateUrl: 'components/cms-nav-user/cms-nav-user.html',
        restrict: 'E',
        controller: [
          '$scope', 'CurrentUser',
          function ($scope, CurrentUser) {
            CurrentUser.$get()
              .then(function (user) {
                $scope.user = user;
              });
          }
        ]
      }
    }
  ]);
