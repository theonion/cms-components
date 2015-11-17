'use strict';

angular.module('cmsComponents')
  .directive('cmsLegend', function () {
    return {
      templateUrl: 'shared/cms-legend/cms-legend.html',
      restrict: 'E',
      transclude: true
    }
  });
