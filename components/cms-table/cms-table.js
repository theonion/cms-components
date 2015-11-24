'use strict';

angular.module('cmsComponents')
  .directive('cmsTable', function () {
    return {
      templateUrl: 'components/cms-table/cms-table.html',
      restrict: 'E',
      transclude: true,
      scope: {
        collection: '='
      },
      link: function ($scope, $element, $attrs) {
        $element.find('cms-table-column').each(function (index, column) {
          $scope.columns.push($(column).clone()[0]);
        });
      },
      controller: function ($scope) {
        $scope.columns = [];
      }
    }
  });
