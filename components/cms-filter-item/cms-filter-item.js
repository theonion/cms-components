'use strict';

angular.module('cmsComponents')
  .directive('cmsFilterItem', function () {
    return {
      templateUrl: 'shared/cms-filter-item/cms-filter-item.html',
      restrict: 'E',
      transclude: true
    }
  });
