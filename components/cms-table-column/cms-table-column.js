'use strict';

angular.module('cmsComponents')
  .directive('cmsTableColumn', function () {
    return {
      templateUrl: 'components/cms-table-column/cms-table-column.html',
      restrict: 'E',
      transclude: true
    }
  });
