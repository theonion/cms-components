'use strict';

angular.module('cmsComponents.auth.loginForm', [
  'cmsComponents.auth.service',
  'cmsComponents.templates'
])
  .directive('cmsTokenAuthLoginForm', [
    function () {
      return {
        controller: [
          '$scope', 'TokenAuthService', 'TokenAuthConfig',
          function ($scope, TokenAuthService, TokenAuthConfig) {

            $scope.LOGO_URL = TokenAuthConfig.getLogoUrl();

            $scope.username = '';
            $scope.password = '';

            $scope.clearLoginErrorFromServer = function () {
              $scope.loginErrorFromServer = null;
            };

            $scope.submitLogin = function () {
              $scope.loginErrorFromServer = null;

              if(!_.isEmpty($scope.username) && !_.isEmpty($scope.password)) {
                TokenAuthService.login($scope.username, $scope.password)
                  .catch(function (error) {
                    $scope.loginErrorFromServer = error.data.non_field_errors[0];
                  });
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
