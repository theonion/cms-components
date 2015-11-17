'use strict';

angular.module('cmsComponents')
  .directive('cmsRow', function () {
    return {
      //templateUrl: 'shared/cms-row/cms-row.html',
      template: '<ng-transclude></ng-transclude>',
      restrict: 'E',
      transclude: true
    }
  });
