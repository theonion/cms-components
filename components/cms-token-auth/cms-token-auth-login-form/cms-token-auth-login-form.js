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
                    var message;
                    if (error.status === 500) {
                      message = 'An error occurred on the server. Try again later or contact tech below.';
                    } else if (_.isUndefined(error.data)) {
                      message = 'No response from server.';
                    } else {
                      message = error.data.non_field_errors[0];
                    }
                    $scope.loginErrorFromServer = message;
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
