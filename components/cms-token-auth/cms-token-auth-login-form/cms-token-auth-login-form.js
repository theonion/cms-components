'use strict';

angular.module('cmsComponents.auth.loginForm', [
  'cmsComponents.auth.service',
  'cmsComponents.templates'
])
  .directive('tokenAuthLoginForm', [
    function () {
      return {
        controller: [
          '$scope', 'TokenAuthService', 'TokenAuthConfig',
          function ($scope, TokenAuthService, TokenAuthConfig) {

            $scope.username = '';
            $scope.password = '';
            $scope.submitted = '';
            $scope.LOGO_URL = TokenAuthConfig.getLogoUrl();

            $scope.submitLogin = function () {
              $scope.submitted = 'submitted';

              if(!_.isEmpty($scope.username) && !_.isEmpty($scope.password)) {
                TokenAuthService.login($scope.username, $scope.password);
              }
            };
          }
        ],
        restrict: 'E',
        scope: {},
        templateUrl: 'components/cms-token-auth/cms-token-auth-login-form/cms-token-auth-login-form.html'
      };
    }
  ]);
