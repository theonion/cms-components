'use strict';

angular.module('cmsComponents.auth', [
  'cmsComponents.auth.interceptor',
  'cmsComponents.auth.config',
  'cmsComponents.auth.loginForm',
  'cmsComponents.auth.loginRequiredWrapper',
  'cmsComponents.auth.user'
]);
