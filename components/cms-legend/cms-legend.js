'use strict';

angular.module('cmsComponents')
  .directive('cmsLegend', function () {
    return {
      templateUrl: 'components/cms-legend/cms-legend.html',
      restrict: 'E',
      transclude: true
    }
  });
