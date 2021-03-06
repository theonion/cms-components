'use strict';

angular.module('cmsComponents.notifications', [
  'cmsComponents.notifications.service',
  'cmsComponents.templates'
])
  .directive('cmsNotifications', [
    'NotificationsService',
    function (NotificationsService) {
      return {
        templateUrl: 'components/cms-notifications/cms-notifications.html',
        restrict: 'E',
        link: function ($scope) {
          $scope.service = NotificationsService;
        }
      }
    }
  ]);
