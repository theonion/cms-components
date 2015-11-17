'use strict';

angular.module('cmsComponents')
  .directive('cmsFilterSet', function () {
    return {
      templateUrl: 'shared/cms-filter-set/cms-filter-set.html',
      restrict: 'E',
      transclude: true
    }
  });
