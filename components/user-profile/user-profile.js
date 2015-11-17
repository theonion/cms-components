'use strict';

angular.module('cmsComponents')
  .directive('userProfile', function () {
    return {
      templateUrl: 'components/user-profile/user-profile.html',
      restrict: 'E',
      controller: ['$scope', 'CurrentUser', 'md5', function ($scope, currentUser, md5) {
        $scope.setUser = function () {
          $scope.currentUser = currentUser.getCurrentUser();
          if ($scope.currentUser) {
            $scope.initials = currentUser.getCurrentUser().slice(0, 2);

            var hash = md5.createHash($scope.currentUser);
            var rgb = '#' + hash.substring(0,2) + hash.substring(2,4) + hash.substring(4,6);
            $scope.userColor = rgb;
          }
          else {
            $scope.currentUser = null;
            $scope.userColor = null;
            $scope.initials = null;
          }
        };
        $scope.$on('userchange', $scope.setUser);
        $scope.setUser();
      }]
    }
  });
