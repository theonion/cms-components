'use strict';

angular.module('cmsComponents')
.directive('cmsLogin', function () {
  return {
    restrict: 'E',
    templateUrl: 'components/cms-login/login.html',
    controller: ['$scope', '$location', 'authService', 'CurrentUser', 'BettyService',
    function ($scope, $location, authService, CurrentUser, BettyService) {

      $scope.init = function () {
        $scope.username = '';
        $scope.password = '';
        $scope.submitted = '';
      };

      $scope.submitLogin = function () {
        $scope.submitted = 'submitted';
        if (!_.isEmpty($scope.username) && !_.isEmpty($scope.password)) {
          authService.login($scope.username, $scope.password)
            .then($scope.userLoggedIn);
        }
      };

      $scope.userLoggedIn = function () {
        CurrentUser.setCurrentUser($scope.username);
        BettyService.updateBettyConfig();
        $location.path('/');
      };

      $scope.init();
    }]
  }
});
