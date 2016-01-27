'use strict';

angular.module('cmsComponents')
  .service('CurrentUser', function (localStorageService, $state, $location, $rootScope) {
    this.currentUser = null;
    this.getCurrentUser = function () {
      return localStorageService.get('currentUser');
    };

    this.setCurrentUser = function (newCurrentUser) {
      localStorageService.set('currentUser', newCurrentUser);
      $rootScope.$broadcast('userchange');
    };

    this.logout = function () {
      this.currentUser = null;
      $rootScope.$broadcast('userchange');
      localStorageService.remove('authToken');
      localStorageService.remove('currentUser');
      $state.go('login');
    };
  });
