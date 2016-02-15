'use strict';

angular.module('cmsComponents')
  .directive('userMenu', function () {
    return {
      templateUrl: 'components/user-menu/user-menu.html',
      restrict: 'E',
      controller: function ($scope, CurrentUser) {
        var setCurrentUser = function () {
          $scope.currentUser = CurrentUser.getCurrentUser();
        };

        $scope.$on('userchange', setCurrentUser);

        setCurrentUser();
      }
    }
  });
