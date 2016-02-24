'use strict';

angular.module('cmsComponents.input', [
  'cmsComponents.tooltip'
])
  .directive('cmsInput', [
    function () {
      return {
        templateUrl: 'components/cms-input/cms-input.html',
        restrict: 'E',
        scope: {
          title: '@',
          inputErrors: '&'
        },
        transclude: true
      }
    }
  ]);
