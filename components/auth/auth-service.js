angular.module('cmsComponents.auth.service', [])
  .service('authService', [
    '$rootScope', '$location', '$http', 'httpRequestBuffer', 'localStorageService',
      'alertService', 'Config', 'CurrentUser',
    function ($rootScope, $location, $http, httpRequestBuffer, localStorageService,
        alertService, Config, CurrentUser) {

      var service = {};

      service.login = function (username, password) {
        return $http.post(Config.apiHost + '/api/token/auth', {
          username: username,
          password: password
        })
        .success(service.loginSuccess)
        .error(service.loginError);
      };

      service.logout = function () {
        localStorageService.remove('authToken');
      };

      service.loginSuccess = function(response) {
        localStorageService.set('authToken', response.token);
      };

      service.loginError = function(response) {
        alertService.addAlert('Username or password provided is incorrect.', 'danger');
      };

      service.refreshToken = function () {
        var token = localStorageService.get('authToken');
        return $http.post(Config.apiHost + '/api/token/refresh', { token: token }, { ignoreAuthModule: true })
        .success(service.tokenRefreshed)
        .error(service.tokenRefreshError);
      };

      service.tokenRefreshed = function(response) {
        localStorageService.set('authToken', response.token);
        httpRequestBuffer.retryAll();
      };

      service.tokenRefreshError = function(response) {
        httpRequestBuffer.rejectAll();
        alertService.addAlert('You failed to authenticate. Redirecting to login.', 'danger');
        CurrentUser.logout();
      };

      return service;
    }
  ]);
