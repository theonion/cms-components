'use strict';

angular.module('cmsComponents')
  .directive('userMenu', function () {
    return {
      templateUrl: 'components/user-menu/user-menu.html',
      restrict: 'E',
      controller: function ($scope, CurrentUser) {
        function setCurrentUser () {
          $scope.currentUser = CurrentUser.getCurrentUser();
          console.log('setCurrentUser in user-menu', $scope.currentUser);
        }
        $scope.$on('userchange', setCurrentUser);
        setCurrentUser();
      }
    }
  });
