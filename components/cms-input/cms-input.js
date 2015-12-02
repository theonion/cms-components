'use strict';

angular.module('cmsComponents')
  .directive('cmsInput', function () {
    return {
      templateUrl: 'components/cms-input/cms-input.html',
      restrict: 'E',
      scope: {
        title: '@'
      },
      transclude: true,
      controller: ['$scope', '$controller', function ($scope, $controller) {
      }]
    }
  });
