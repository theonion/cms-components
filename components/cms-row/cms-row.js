'use strict';

angular.module('cmsComponents')
  .directive('cmsRow', function () {
    return {
      template: '<ng-transclude></ng-transclude>',
      restrict: 'E',
      transclude: true
    }
  });
