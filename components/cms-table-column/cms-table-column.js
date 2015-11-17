'use strict';

angular.module('cmsComponents')
  .directive('cmsTableColumn', function () {
    return {
      templateUrl: 'shared/cms-table-column/cms-table-column.html',
      restrict: 'E',
      transclude: true
    }
  });
