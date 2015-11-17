'use strict';

angular.module('cmsComponents')
  .directive('cmsFilterSet', function () {
    return {
      templateUrl: 'components/cms-filter-set/cms-filter-set.html',
      restrict: 'E',
      transclude: true
    }
  });
