'use strict';

angular.module('cmsComponents')
  .directive('cmsContainer', function () {
    return {
      templateUrl: 'shared/cms-container/cms-container.html',
      restrict: 'E',
      transclude: true
    }
  });
