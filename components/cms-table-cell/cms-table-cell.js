'use strict';

angular.module('cmsComponents')
  .directive('cmsTableCell', function ($compile) {
    return {
      templateUrl: 'components/cms-table-cell/cms-table-cell.html',
      restrict: 'A',
      scope: {
        column: '=',
        item: '=',
        text: '='
      },
      compile: function (element, attributes) {
        return {
          pre: function ($scope, $element, $attributes) {
            // first child is ng-transclude, we don't want that here
            $element.append($scope.column.children[0].innerHTML);
            $compile($element.contents())($scope);
          }
        };
      }
    }
  });
