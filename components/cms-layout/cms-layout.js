'use strict';

angular.module('cmsComponents.cmsLayout', [])
  .directive('cmsLayout', [
    function () {
      return {
        templateUrl: 'components/cms-layout/cms-layout.html',
        restrict: 'E',
        transclude: true
      }
    }
  ]);
