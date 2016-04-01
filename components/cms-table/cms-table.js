'use strict';

angular.module('cmsComponents')
  .directive('cmsTable', [
    function () {
      return {
        templateUrl: 'components/cms-table/cms-table.html',
        restrict: 'E',
        transclude: true,
        scope: {
          collection: '='
        },
        controller: [
          '$scope',
          function ($scope) {

            $scope.columns = [];

            return {
              addColumn: function (column) {
                $scope.columns.push(column);
              }
            };
          }
        ]
      }
    }
  ]);
