'use strict';

/**
 * Renders item data based on column spec.
 */
angular.module('cmsComponents')
  .directive('cmsTableCell', [
    '$compile',
    function ($compile) {
      return {
        restrict: 'A',
        require: '^cmsTable',
        scope: {
          column: '=',    // column spec associated with this cell
          item: '='       // item spec assicated with this cell
        },
        link: function (scope, elements) {
          scope.column.buildHtml(scope).then(function (html) {
            elements.html(html);
          });
        }
      }
    }
  ]);
