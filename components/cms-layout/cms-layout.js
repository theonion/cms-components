'use strict';

angular.module('cmsComponents')
  .directive('cmsLayout', function () {
    return {
      templateUrl: 'components/cms-layout/cms-layout.html',
      restrict: 'E',
      transclude: true,
      controller: function ($scope, CurrentUser) {
        function setCurrentUser () {
          $scope.currentUser = CurrentUser.getCurrentUser();
        }
        $scope.$on('userchange', setCurrentUser);
        setCurrentUser();
      }
    }
  });
