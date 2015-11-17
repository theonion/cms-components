'use strict';

angular.module('cmsComponents')
  .directive('cmsInput', function () {
    return {
      templateUrl: 'components/cms-input/cms-input.html',
      restrict: 'E',
      scope: {
        title: '@',
        placeholder: '@',
        type: '@',
        multiline: '@',
        select: '@',
        rows: '@',
        ngModel: '=',
        name: '@',
      },
      transclude: true,
      compile: function (element, attributes) {
        return {
          pre: function ($scope, $element, $attributes) {
            if ($attributes.reverseTrueAndFalse !== undefined) {
              $scope.reverse = true;
            }
            if ($attributes.multiline !== undefined) {
              $scope.multiline = true;
            }
          }
        }
      },
      link: function ($scope, $element, $attrs) {
        if ($attrs.type === 'select') {
          $attrs.select = 'select';
        }
      },
      controller: ['$scope', '$controller', function ($scope, $controller) {
      }]
    }
  });
